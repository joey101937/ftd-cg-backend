import { PrismaClient } from "@prisma/client";
import { canCardBePlayedToZone, canPlayerAffordCard, getResourcesForTurn, hasKeyword } from "./gameLogicService";
import { CARD_TYPES, GAME_ACTION_TYPES, TRIGGERS, VEHICLE_KEYWORDS, VEHICLE_TYPES } from "../gameConstants/gameSettings";
import { cardEffects } from "./cardEffectHandler";
import { cloneDeep } from "lodash";

const prismaClient = new PrismaClient();

const endTurnHandler = async (game, playerId) => {
    const isAttackingPlayer = game.attackingPlayerId === playerId;
    const isPlayersTurn = isAttackingPlayer ? game.isAttackingPlayersTurn : !game.isAttackingPlayersTurn;

    if (!isPlayersTurn) return { status: 400, data: { error: 'Not players turn' } };

    game.turnNumber = parseFloat(game.turnNumber) + .5;
    game.isAttackingPlayersTurn = !game.isAttackingPlayersTurn;

    if (isAttackingPlayer) {
        game.defendingPlayerMaterials = getResourcesForTurn(game.turnNumber);
        const drawnCard = game.defendingPlayerDeckInstance.shift();
        if (drawnCard) game.defendingPlayerHand.push(drawnCard);
        for (let i = 0; i < game.zones.length; i++) {
            game.zones[i].defendingPlayerCards = game.zones[i].defendingPlayerCards.filter(x => !hasKeyword(x, VEHICLE_KEYWORDS.TEMPORARY));
        }
    } else {
        game.attackingPlayerMaterials = getResourcesForTurn(game.turnNumber);
        const drawnCard = game.attackingPlayerDeckInstance.shift();
        if (drawnCard) game.attackingPlayerHand.push(drawnCard);
        for (let i = 0; i < game.zones.length; i++) {
            game.zones[i].attackingPlayerCards = game.zones[i].defendingPlayerCards.filter(x => !hasKeyword(x, VEHICLE_KEYWORDS.TEMPORARY));
        }
    }

    const updatedGame = await prismaClient.game.update({
        where: {
            id: game.id,
        },
        data: game
    });

    return { status: 200, data: updatedGame };

};

const attackEnemyBase = async (game, actionBody, playerId) => {
    const {
        targetZoneId,
    } = actionBody;

    const isAttackingPlayer = game.attackingPlayerId === playerId;
    const isPlayersTurn = isAttackingPlayer ? game.isAttackingPlayersTurn : !game.isAttackingPlayersTurn;

    if (!isPlayersTurn) return { status: 400, error: 'Not players turn' };

    const targetZone = game.zones.find(x => x.id === targetZoneId);

    if (!targetZone) {
        return { status: 400, data: { error: 'target zone not present in game' } };
    }

    if (`${targetZone.lastActivatedTurn}` == `${game.turnNumber}`) return { status: 400, data: { error: 'Zone already activated this turn' } };

    const enemyVehicles = isAttackingPlayer ? targetZone.defendingPlayerCards : targetZone.attackingPlayerCards;
    const enemyHasBlockers = enemyVehicles.find(x => hasKeyword(x, VEHICLE_KEYWORDS.BLOCKER));

    if (enemyHasBlockers) return { status: 400, data: { error: 'Unable to attack base when enemy has blockers' } };

    const friendlyVehicles = isAttackingPlayer ? targetZone.attackingPlayerCards : targetZone.defendingPlayerCards;

    let damageToDeal = 0;

    friendlyVehicles.forEach(x => {
        if (x.vehicleType && x.vehicleType !== VEHICLE_TYPES.SUB && `${x.meta.turnPlayed}` !== `${game.turnNumber}` && !hasKeyword(x, VEHICLE_KEYWORDS.INOFFENSIVE)) {
            damageToDeal += (x.materialCost / 1000);
        }
    });

    if (isAttackingPlayer) {
        targetZone.defendingPlayerHp -= damageToDeal;
    } else {
        targetZone.attackingPlayerHp -= damageToDeal;
    }

    targetZone.lastActivatedTurn = game.turnNumber;

    const updatedGame = await prismaClient.game.update({
        where: {
            id: game.id,
        },
        data: game
    });

    return { status: 200, data: updatedGame };

};

/**
 * Validates that card can be played and if it can be, plays it to the game and returns the updated game state.
 * For vehicles it spawns them in and then triggers onPlay and onPlayZone triggers. For abilities it just triggers onPlay and onPlayZone
 * @param {Game} game 
 * @param {Object} actionBody 
 * @param {String} playerId 
 * @returns result
 */
const playCardToZoneHandler = async (game, actionBody, playerId) => {
    const {
        targetZoneId,
        cardInstanceId,
    } = actionBody;

    const isAttackingPlayer = game.attackingPlayerId === playerId;
    const isPlayersTurn = isAttackingPlayer ? game.isAttackingPlayersTurn : !game.isAttackingPlayersTurn;

    if (!isPlayersTurn) return { status: 400, error: 'Not players turn' };

    const playerHand = isAttackingPlayer ? game.attackingPlayerHand : game.defendingPlayerHand;

    const playingCard = playerHand.find(x => x.instanceId = cardInstanceId);

    const targetZone = game.zones.find(x => x.id === targetZoneId);

    if (!targetZone) {
        return { status: 400, data: { error: 'target zone not present in game' } };
    }

    if (!canPlayerAffordCard(game, playingCard, playerId)) {
        return { status: 400, data: { error: 'Player cannot afford that card' } };
    }

    if (!canCardBePlayedToZone(game, playingCard.instanceId, targetZoneId)) {
        return { status: 400, data: { error: 'That card cannot be legally played to that zone' } };
    }

    if (playingCard.meta[TRIGGERS.PLAY_ON_ZONE]) {
        const func = cardEffects[playingCard.meta[TRIGGERS.PLAY_ON_ZONE]];
        if (!func) return { status: 500, data: { error: `missing play on zone function ${playingCard.meta[TRIGGERS.PLAY_ON_ZONE]}` } };
        try {
            const wasSuccess = await func({
                game,
                playingCard,
                playerId,
                actionBody
            });
            if (!wasSuccess) return { status: 400, data: { error: 'Cards PLAY_ON_ZONE trigger failed' } };
        } catch (e) {
            console.log(e.message);
            return { status: 400, data: { error: 'Cards PLAY_ON_ZONE trigger errored' } };
        }
    }

    if (playingCard.meta[TRIGGERS.ON_PLAY]) {
        const func = cardEffects[playingCard.meta[TRIGGERS.ON_PLAY]];
        if (!func) return { status: 500, data: { error: `missing on play function ${playingCard.meta[TRIGGERS.ON_PLAY]}` } };
        try {
            const wasSuccess = await func({
                game,
                playingCard,
                playerId,
                actionBody
            });
            if (!wasSuccess) return { status: 400, data: { error: 'Cards ON_PLAY trigger failed' } };
        } catch (e) {
            console.log(e.message);
            return { status: 400, data: { error: 'Cards ON_PLAY trigger errored' } };
        }
    }

    const materialCost = hasKeyword(playingCard, VEHICLE_KEYWORDS.HALF_COST) ? playingCard.materialCost / 2 : playingCard.materialCost;

    if (playingCard.type === CARD_TYPES.VEHICLE) {
        playingCard.meta.turnPlayed = game.turnNumber;
        if (isAttackingPlayer) {
            if (playingCard.meta.additionalCopies) {
                for (let i = 0; i < playingCard.meta.additionalCopies; i++) {
                    targetZone.attackingPlayerCards.push(cloneDeep(playingCard));
                    if (i > 10) break; // hard limit of 10 spawns
                }
            }
            targetZone.attackingPlayerCards.push(playingCard);
            game.attackingPlayerHand = game.attackingPlayerHand.filter(x => x.instanceId !== playingCard.instanceId);
            game.attackingPlayerMaterials -= materialCost;
            game.attackingPlayerCp -= playingCard.cpCost;
        } else {
            if (playingCard.meta.additionalCopies) {
                for (let i = 0; i < playingCard.meta.additionalCopies; i++) {
                    targetZone.defendingPlayerCards.push(cloneDeep(playingCard));
                    if (i > 10) break; // hard limit of 10 spawns
                }
            }
            targetZone.defendingPlayerCards.push(playingCard);
            game.defendingPlayerHand = game.defendingPlayerHand.filter(x => x.instanceId !== playingCard.instanceId);
            game.attackingPlayerMaterials -= materialCost;
            game.attackingPlayerCp -= playingCard.cpCost;
        }
    }

    const updatedGame = await prismaClient.game.update({
        where: {
            id: game.id,
        },
        data: game
    });

    return { status: 200, data: updatedGame };

};

export const handleGameAction = async ({ triggeringPlayerId, gameId, actionType, actionBody }) => {

    if (!triggeringPlayerId || !gameId || !actionType || !actionBody) {
        return { status: 400, data: { error: 'Missing parameter. triggeringPlayerId, gameId, actionType, actionBody required' } };
    }

    const game = await prismaClient.game.findFirst({
        where: {
            id: {
                equals: gameId,
            },
            OR: {
                attackingPlayerId: { equals: triggeringPlayerId },
                defendingPlayerId: { equals: triggeringPlayerId }
            }
        }
    });

    if (!game) {
        return { status: 400, data: { error: `User is not in a game with given id ${gameId}` } };
    }

    switch (actionType) {
        case GAME_ACTION_TYPES.PLAY_CARD_TO_ZONE: return await playCardToZoneHandler(game, actionBody, triggeringPlayerId);
        case GAME_ACTION_TYPES.ATTACK_ENEMY_BASE: return await attackEnemyBase(game, actionBody, triggeringPlayerId);
        case GAME_ACTION_TYPES.END_TURN: return await endTurnHandler(game, triggeringPlayerId);
        default: return { status: 400, data: { error: `unknown actionType ${actionType}` } };
    }
};