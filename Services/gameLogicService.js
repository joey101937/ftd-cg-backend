import { CARD_TYPES, VEHICLE_KEYWORDS, VEHICLE_TYPES, ZONE_TYPES } from "../gameConstants/gameSettings";

export const hasKeyword = (vehicle, keyword) => {
    return vehicle?.keywords?.includes(keyword) || false;
};

export const canPlayerAffordCard = (game, card, playerId) => {
    const isAttackingPlayer = game.attackingPlayerId === playerId;
    const {
        materialCost,
        cpCost
    } = card;

    if(isAttackingPlayer) {
        return game.attackingPlayerCp >= cpCost && game.attackingPlayerMaterials >= materialCost;
    } else {
        return game.defendingPlayerCp >= cpCost && game.defendingPlayerMaterials >= materialCost;
    }
};

export const payForCard = (inputGame, card, playerId) => {
    const isAttackingPlayer = inputGame.attackingPlayerId === playerId;
    const {
        materialCost,
        cpCost
    } = card;

    if(isAttackingPlayer) {
        inputGame.attackingPlayerCp -= cpCost;
        inputGame.attackingPlayerMaterials -= materialCost;
    } else {
        inputGame.defendingPlayerCp -= cpCost;
        inputGame.defendingPlayerMaterials -= materialCost;
    }

    return inputGame;
};

export const canCardBePlayedToZoneType = (card, zoneType) => {
    if(card.type === CARD_TYPES.VEHICLE) {
        switch(card.vehicleType) {
            case VEHICLE_TYPES.SHIP: return zoneType === ZONE_TYPES.WATER || zoneType === ZONE_TYPES.BEACH;
            case VEHICLE_TYPES.SUB: return zoneType === ZONE_TYPES.WATER || zoneType === ZONE_TYPES.BEACH;
            case VEHICLE_TYPES.TANK: return zoneType === ZONE_TYPES.LAND || zoneType === ZONE_TYPES.BEACH;
            case VEHICLE_TYPES.FLIER: return true;
            default:
                console.log('WARNING canCardBePlayedToZone called on vehicle card with invalid or missing vehicleType', card);
                return true;
        }
    }
    if(card.type === CARD_TYPES.ABILITY) {
        // may need to add ability logic here if they become zoneType-specific in the future
        return true;
    }
    console.log('WARNING canCardBePlayedToZone called on card without valid type', card);
    return true;
};

export const canCardBePlayedToZone = (game, cardInstanceId, zoneId) => {
    const attackingPlayerCard = game.attackingPlayerHand.find(x => x.instanceId === cardInstanceId);
    const defendingPlayerCard = game.defendingPlayerHand.find(x => x.instanceId === cardInstanceId);
    const card = attackingPlayerCard || defendingPlayerCard;

    if(!card) {
        console.log('WARNING- trying to play card that does not exist in either players hand', {gameId: game.id, cardInstanceId});
    }

    const zone = game.zones.find(x => x.id === zoneId);

    // zone type not legal
    if(!canCardBePlayedToZoneType(card, zone.type )) return false;

    const enemyCards = attackingPlayerCard ? zone.defendingPlayerCards : zone.attackingPlayerCards;
    
    const isSubScreened = enemyCards.find(x => hasKeyword(x, VEHICLE_KEYWORDS.SUB_SCREEN));
    const isAirScreened = enemyCards.find(x => hasKeyword(x, VEHICLE_KEYWORDS.AIR_SCREEN));

    if(card.type === CARD_TYPES.VEHICLE) {
        if(card.vehicleType === VEHICLE_TYPES.SUB && isSubScreened) return false;
        if(card.vehicleType === VEHICLE_TYPES.FLIER && isAirScreened) return false;
    } else {
        // abilityCard has a play on zone effect
        return !!card.meta.playOnZoneEffect;
    }

    return true;
};


/*
    at the start of each turn, player's resources are set to a certain amount
    turnNumber 1 = attacking player turn 1
    turnNumber 2 = defending player turn 1
*/
export const getResourcesForTurn = (turnNumber) => {
    const realTurnNumber = Math.floor(turnNumber);
    return realTurnNumber*50000;
};