import { PrismaClient } from "@prisma/client";
import { canCardBePlayedToZone, canPlayerAffordCard, getResourcesForTurn, hasKeyword } from "./gameLogicService";
import { CARD_TYPES, GAME_ACTION_TYPES, VEHICLE_KEYWORDS, VEHICLE_TYPES } from "../gameConstants/gameSettings";

const prismaClient = new PrismaClient();

const endTurnHandler = async (game, playerId) => {
    const isAttackingPlayer = game.attackingPlayerId === playerId;
    const isPlayersTurn = isAttackingPlayer ? game.isAttackingPlayersTurn : !game.isAttackingPlayersTurn;

    if (!isPlayersTurn) return { status: 400, data: {error: 'Not players turn'} };

    game.turnNumber = parseFloat(game.turnNumber) + .5;
    game.isAttackingPlayersTurn = !game.isAttackingPlayersTurn;

    if(isAttackingPlayer) {
        game.defendingPlayerMaterials = getResourcesForTurn(game.turnNumber);
        const drawnCard = game.defendingPlayerDeckInstance.shift();
        if(drawnCard) game.defendingPlayerHand.push(drawnCard);
        for(let i =0; i< game.zones.length; i++) {
            game.zones[i].defendingPlayerCards = game.zones[i].defendingPlayerCards.filter(x => !hasKeyword(x, VEHICLE_KEYWORDS.TEMPORARY));
        }
    } else {
        game.attackingPlayerMaterials = getResourcesForTurn(game.turnNumber);
        const drawnCard = game.attackingPlayerDeckInstance.shift();
        if(drawnCard) game.attackingPlayerHand.push(drawnCard);
        for(let i =0; i< game.zones.length; i++) {
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

    if(`${targetZone.lastActivatedTurn}` == `${game.turnNumber}`) return { status: 400, data: { error: 'Zone already activated this turn' } };

    const enemyVehicles = isAttackingPlayer ? targetZone.defendingPlayerCards : targetZone.attackingPlayerCards;
    const enemyHasBlockers = enemyVehicles.find(x => hasKeyword(x, VEHICLE_KEYWORDS.BLOCKER));

    if(enemyHasBlockers) return { status: 400, data: { error: 'Unable to attack base when enemy has blockers' } };

    const friendlyVehicles = isAttackingPlayer ? targetZone.attackingPlayerCards : targetZone.defendingPlayerCards;

    let damageToDeal = 0;

    friendlyVehicles.forEach(x => {
        if(x.vehicleType && x.vehicleType !== VEHICLE_TYPES.SUB && `${x.meta.turnPlayed}` !== `${game.turnNumber}` && !hasKeyword(x, VEHICLE_KEYWORDS.INOFFENSIVE)) {
            damageToDeal += (x.materialCost / 1000);
        }
    });
    
    if(isAttackingPlayer) {
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

    const materialCost = hasKeyword(playingCard, VEHICLE_KEYWORDS.HALF_COST) ? playingCard.materialCost/2 : playingCard.materialCost;

    if (playingCard.type === CARD_TYPES.VEHICLE) {
        playingCard.meta.turnPlayed = game.turnNumber;
        if (isAttackingPlayer) {
            targetZone.attackingPlayerCards.push(playingCard);
            game.attackingPlayerHand = game.attackingPlayerHand.filter(x => x.instanceId !== playingCard.instanceId);
            game.attackingPlayerMaterials -= materialCost;
            game.attackingPlayerCp -= playingCard.cpCost;
        } else {
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