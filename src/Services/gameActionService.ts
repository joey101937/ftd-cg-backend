import { Prisma, PrismaClient } from "@prisma/client";
import { canCardBePlayedToZone, canPlayerAffordCard, doPlayersHaveNegativeResources, getMaterialCostOfCard, getResourcesForTurn, hasKeyword, payForCard } from "./gameLogicService";
import { CARD_TYPES, GAME_ACTION_TYPES, TRIGGERS, KEYWORDS, VEHICLE_TYPES } from "../gameConstants/gameSettings";
import { cardEffects } from "./cardEffectHandler";
import { cloneDeep } from "lodash";
import { InstantiatedGame, ServiceResponse, instantiatedCard, pendingChangeSchema } from "../gameConstants/schemas";
import { getActiveCardsOfPlayer, getRollOfOwner, removeCardFromPlay, spendResourcesForPlayer } from "../utils";
import { updateGameDbEntry } from "./gameService";

const prismaClient = new PrismaClient();

const endTurnHandler = async (game: InstantiatedGame, playerId: string) => {
    const isAttackingPlayer = game.attackingPlayerId === playerId;
    const isPlayersTurn = isAttackingPlayer ? game.isAttackingPlayersTurn : !game.isAttackingPlayersTurn;

    if (!isPlayersTurn) return { status: 400, data: { error: 'Not players turn' } };

    game.turnNumber = game.turnNumber + .5;
    game.isAttackingPlayersTurn = !game.isAttackingPlayersTurn;

    if (isAttackingPlayer) {
        game.defendingPlayerMaterials = getResourcesForTurn(game.turnNumber);
        const drawnCard = game.defendingPlayerDeckInstance.shift();
        if (drawnCard) game.defendingPlayerHand.push(drawnCard);
        for (let i = 0; i < game.zones.length; i++) {
            game.zones[i].defendingPlayerCards = game.zones[i].defendingPlayerCards.filter(x => !hasKeyword(x, KEYWORDS.TEMPORARY));
        }
    } else {
        game.attackingPlayerMaterials = getResourcesForTurn(game.turnNumber);
        const drawnCard = game.attackingPlayerDeckInstance.shift();
        if (drawnCard) game.attackingPlayerHand.push(drawnCard);
        for (let i = 0; i < game.zones.length; i++) {
            game.zones[i].attackingPlayerCards = game.zones[i].defendingPlayerCards.filter(x => !hasKeyword(x, KEYWORDS.TEMPORARY));
        }
    }

    const updatedGame = await updateGameDbEntry(game);

    return { status: 200, data: updatedGame };

};

const attackEnemyBase = async (game: InstantiatedGame, actionBody: any, playerId: string) => {
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
    const enemyHasBlockers = enemyVehicles.find(x => hasKeyword(x, KEYWORDS.BLOCKER));

    if (enemyHasBlockers) return { status: 400, data: { error: 'Unable to attack base when enemy has blockers' } };

    const friendlyVehicles = isAttackingPlayer ? targetZone.attackingPlayerCards : targetZone.defendingPlayerCards;

    let damageToDeal = 0;

    friendlyVehicles.forEach(x => {
        if (x.vehicleType && x.vehicleType !== VEHICLE_TYPES.SUB && `${x.meta.turnPlayed}` !== `${game.turnNumber}` && !hasKeyword(x, KEYWORDS.INOFFENSIVE)) {
            damageToDeal += (Math.floor(x.materialCost / 1000));
        }
    });

    if (isAttackingPlayer) {
        targetZone.defendingPlayerHp -= damageToDeal;
    } else {
        targetZone.attackingPlayerHp -= damageToDeal;
    }

    targetZone.lastActivatedTurn = game.turnNumber;

    const updatedGame = await updateGameDbEntry(game);

    return { status: 200, data: updatedGame };

};

/**
 * Iterates through all hero powers used in a battle and triggers their effects.
 * returns true if they all succeed, false if one or more fails.
 * @param {object} game game to run against
 * @returns true/false if successful
 */
const handlePostBattleHeroPowers = (game: InstantiatedGame) => {
    const { pendingChange, attackingPlayerAvailableHeroPowers, defendingPlayerAvailableHeroPowers } = game;
    const { heroPowersUsed } = pendingChange;

    const allHeroPowers = [...attackingPlayerAvailableHeroPowers, ...defendingPlayerAvailableHeroPowers];

    if(!Object.keys(heroPowersUsed).every(key => !!allHeroPowers.find(hp => hp.instanceId === key))) {
        console.log('not all hero powers used are available in the game', {
            heroPowersUsed,
            attackingPlayerAvailableHeroPowers,
            defendingPlayerAvailableHeroPowers
        });
    }

    const results = [];

    Object.keys(heroPowersUsed).forEach(hpInstanceId => {
        const heroPower = allHeroPowers.find(x => x.instanceId === hpInstanceId);
        const onBattleFunc = cardEffects[heroPower.meta[TRIGGERS.ON_BATTLE_EFFECT]];
        if(onBattleFunc) results.push(onBattleFunc(game, heroPower));
    });

    return results.every(x => !!x);
};

export const applyPendingDecision = async (game: InstantiatedGame) => {
    const { pendingChange } = game;
    if(!game.pendingChange) return { status: 400, data: {error: 'Game has no pending change'} };
    const validationResponse = pendingChangeSchema.validate(game.pendingChange);
    if(validationResponse.error) return { status: 409, data: {error: `Pending change failed schema validation- ${validationResponse.error}`} };

    const updatedGame : InstantiatedGame = cloneDeep(game);

    const allActiveCards : Array<instantiatedCard> = [...getActiveCardsOfPlayer(game, updatedGame.attackingPlayerId), ...getActiveCardsOfPlayer(game, updatedGame.defendingPlayerId)];
    const instanceIdsToDestroy = pendingChange.cardsToDestroy || [];
    const instanceIdsToRepair = pendingChange.vehiclesToRepair || [];
    
    // remove destroyed vehicles
    instanceIdsToDestroy.forEach(instanceId => {
        removeCardFromPlay(updatedGame, instanceId);
    });
    // trigger on death effects
    let onDeathEffectError = null;
    allActiveCards.filter(x => instanceIdsToDestroy.includes(x.instanceId)).forEach(destroyedCard => {
        if(destroyedCard.meta[TRIGGERS.ON_DEATH]) {
            const func = cardEffects[destroyedCard?.meta[TRIGGERS.ON_DEATH]];
            if (!func) onDeathEffectError = `missing on death function ${destroyedCard.meta[TRIGGERS.ON_DEATH]}`;
            if (!func(destroyedCard, game)) onDeathEffectError = `Cards ON_DEATH trigger failed ${destroyedCard.instanceId}-  ${destroyedCard.name}`;
        };
    });
    if(onDeathEffectError) return { status: 500, data: {error: onDeathEffectError }};

    // trigger onBattle effects
    pendingChange.participatingCards.forEach(instanceId => {
        const cardInstance = allActiveCards.find(x => x.instanceId === instanceId);
        const onBattleEffect = cardInstance.meta[TRIGGERS.ON_BATTLE_EFFECT];
        if(onBattleEffect) {
            onBattleEffect(cardInstance, game)
        }
    });
    

    // handle repair costs
    allActiveCards.filter(x => instanceIdsToRepair.includes(x.instanceId)).forEach(cardToRepair => {
        const roleOfOwner = getRollOfOwner(updatedGame, cardToRepair); // attacker or defender string
        if(roleOfOwner === 'attacker') {
            updatedGame.attackingPlayerMaterials -= (cardToRepair.materialCost/2);
        }
        if(roleOfOwner === 'defender') {
            updatedGame.defendingPlayerMaterials -= (cardToRepair.materialCost/2);
        }
    });

    if(updatedGame.defendingPlayerMaterials < 0 || updatedGame.attackingPlayerMaterials < 0) return {status: 400, data: { error: 'Repairs cannot be afforded' }};
    
    // handle postBattleCardsPlayed
    // these should attempt to proc effects if any and charge player for their cost if any
    const attackersPostBattleCards = game.attackingPlayerHand.filter(x => pendingChange.battleCardsPlayed.includes(x.instanceId));
    const defendersPostBattleCards = game.attackingPlayerHand.filter(x => pendingChange.battleCardsPlayed.includes(x.instanceId));

    attackersPostBattleCards.forEach(card => payForCard(game, card, game.attackingPlayerId));
    defendersPostBattleCards.forEach(card => payForCard(game, card, game.defendingPlayerId));
    
    if(doPlayersHaveNegativeResources(game)) return {status: 400, data: {error: 'Players would have negative resources after paying for postbattle cards' }};

    const effectResults = [...attackersPostBattleCards, ...defendersPostBattleCards].filter(x => !!x.meta[TRIGGERS.ON_BATTLE_EFFECT]).map(card => {
        const func = cardEffects[card.meta[TRIGGERS.ON_BATTLE_EFFECT]];
        if(!func) {
            console.log('Missing on battle function for ', card.meta[TRIGGERS.ON_BATTLE_EFFECT]);
            return false;
        }
        else return func(card, game); 
    });

    if(effectResults.filter(x => !x).length > 0) return { status: 400, data: { error: 'Not all card effects returned true' }};

    const heroPowerResult = handlePostBattleHeroPowers(game);

    if(!heroPowerResult) return { status: 500, data: { error: 'Hero powers failed' } };
    
    // @ts-ignore:nextline
    game.pendingChange = Prisma.JsonNull;
    await updateGameDbEntry(game);
    // putting null in response bc Prisma.JsonNull serializes to empty json
    return {status: 200, data: {...game, pendingChange: null } };
};

/**
 * Validates that card can be played and if it can be, plays it to the game and returns the updated game state.
 * For vehicles it spawns them in and then triggers onPlay and onPlayZone triggers. For abilities it just triggers onPlay and onPlayZone
 * @param {Game} game 
 * @param {Object} actionBody 
 * @param {String} playerId 
 * @returns result
 */
const playCardToZoneHandler = async (game: InstantiatedGame, actionBody, playerId) : Promise<ServiceResponse> => {
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
                playingCard,
                game,
                playerId,
                actionBody
            });
            if (!wasSuccess) return { status: 400, error: 'Cards PLAY_ON_ZONE trigger failed' };
        } catch (e) {
            console.log(e.message);
            return { status: 400, error: 'Cards PLAY_ON_ZONE trigger errored' };
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
            if (!wasSuccess) return { status: 400, error: 'Cards ON_PLAY trigger failed' };
        } catch (e) {
            console.log(e.message);
            return { status: 400, error: 'Cards ON_PLAY trigger errored' };
        }
    }

    const materialCost = getMaterialCostOfCard(playingCard, game);

    spendResourcesForPlayer(game, playerId, materialCost, playingCard.cpCost);

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
        } else {
            if (playingCard.meta.additionalCopies) {
                for (let i = 0; i < playingCard.meta.additionalCopies; i++) {
                    targetZone.defendingPlayerCards.push(cloneDeep(playingCard));
                    if (i > 10) break; // hard limit of 10 spawns
                }
            }
            targetZone.defendingPlayerCards.push(playingCard);
            game.defendingPlayerHand = game.defendingPlayerHand.filter(x => x.instanceId !== playingCard.instanceId);
        }
    }

    const updatedGame = await updateGameDbEntry(game);

    return { status: 200, data: updatedGame };
};

const playCardWithoutTargetHandler = async(game: InstantiatedGame, actionBody, playerId) : Promise<ServiceResponse> => {
    const {
        cardInstanceId
    } = actionBody;

    const isAttackingPlayer = game.attackingPlayerId === playerId;
    const isPlayersTurn = isAttackingPlayer ? game.isAttackingPlayersTurn : !game.isAttackingPlayersTurn;

    if (!isPlayersTurn) return { status: 400, error: 'Not players turn' };

    const playerHand = isAttackingPlayer ? game.attackingPlayerHand : game.defendingPlayerHand;

    const playingCard = playerHand.find(x => x.instanceId = cardInstanceId);

    if (playingCard.type === CARD_TYPES.VEHICLE) {
        return {status: 400, error: 'Vehicle card must be played to a zone'};
    }

    if (!canPlayerAffordCard(game, playingCard, playerId)) {
        return { status: 400, error: 'Player cannot afford that card' };
    }

    if (playingCard.meta[TRIGGERS.ON_PLAY]) {
        const func = cardEffects[playingCard.meta[TRIGGERS.ON_PLAY]];
        if (!func) return { status: 500, error: `missing on play function ${playingCard.meta[TRIGGERS.ON_PLAY]}` };
        try {
            const wasSuccess = await func({
                game,
                playingCard,
                playerId,
                actionBody
            });
            if (!wasSuccess) return { status: 400, error: 'Cards ON_PLAY trigger failed'};
        } catch (e) {
            console.log(e.message);
            return { status: 400, error: 'Cards ON_PLAY trigger errored' };
        }
    }
    
    const materialCost = getMaterialCostOfCard(playingCard, game);

    spendResourcesForPlayer(game, playerId, materialCost, playingCard.cpCost);

    const updatedGame = await updateGameDbEntry(game);

    return { status: 200, data: updatedGame };
}


export const submitPendingChangeHandler = async (game: InstantiatedGame, actionBody, triggeringPlayerId) : Promise<ServiceResponse> => {
    actionBody.proposingPlayerId = triggeringPlayerId;
    const validationResponse = pendingChangeSchema.validate(actionBody);
    if(!validationResponse.error) {
        game.pendingChange = actionBody;
        const updatedGame = await updateGameDbEntry(game);
        return { status: 200, data: {updatedGame} };
    } else {
        return { status: 400, error: `Validation Error: ${validationResponse.error}`};
    }
};

export const decidePendingChangeHandler = async (game: InstantiatedGame, actionBody, triggeringPlayerId) : Promise<ServiceResponse> => {
    if(!game.pendingChange) return { status: 400, error: 'Game has no pending change' };
    if(game.pendingChange.proposingPlayerId === triggeringPlayerId) return {status: 400, error: 'You cannot approve your own proposal' };
    if(actionBody.decision === false) {
        // @ts-ignore:next-line
        game.pendingChange = Prisma.JsonNull;
        const updatedGame = await updateGameDbEntry(game);
        return { status: 200, data: { updatedGame } };
    }

    const result = await applyPendingDecision(game);
    return result;
};

export const handleGameAction = async ({ triggeringPlayerId, gameId, actionType, actionBody }) : Promise<ServiceResponse> => {

    if (!triggeringPlayerId || !gameId || !actionType || !actionBody) {
        return { status: 400, data: { error: 'Missing parameter. triggeringPlayerId, gameId, actionType, actionBody required' } };
    }

    // @ts-ignore:next-line
    const game: InstantiatedGame = await prismaClient.game.findFirst({
        where: {
            id: {
                equals: gameId,
            },
            // make sure the triggering player is in the game
            OR: {
                attackingPlayerId: { equals: triggeringPlayerId },
                defendingPlayerId: { equals: triggeringPlayerId }
            }
        }
    });

    if (!game) {
        return { status: 400, error: `User is not in a game with given id ${gameId}` };
    }

    switch (actionType) {
        case GAME_ACTION_TYPES.PLAY_CARD_TO_ZONE: return await playCardToZoneHandler(game, actionBody, triggeringPlayerId);
        case GAME_ACTION_TYPES.PLAY_CARD_WITHOUT_TARGET: return await playCardWithoutTargetHandler(game, actionBody, triggeringPlayerId);
        case GAME_ACTION_TYPES.ATTACK_ENEMY_BASE: return await attackEnemyBase(game, actionBody, triggeringPlayerId);
        case GAME_ACTION_TYPES.END_TURN: return await endTurnHandler(game, triggeringPlayerId);
        case GAME_ACTION_TYPES.SUBMIT_PENDING_CHANGE: return await submitPendingChangeHandler(game, actionBody, triggeringPlayerId);
        case GAME_ACTION_TYPES.DECIDE_PENDING_CHANGE: return await decidePendingChangeHandler(game, actionBody, triggeringPlayerId);
        default: return { status: 400,  error: `unknown actionType ${actionType}` };
    }
};