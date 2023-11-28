import { Game } from ".prisma/client";
import { CARD_TYPES, KEYWORDS, VEHICLE_TYPES, ZONE_TYPES } from "../gameConstants/gameSettings";
import { InstantiatedGame, instantiatedCard } from "../gameConstants/schemas";
import { cardEffects } from "./cardEffectHandler";

export const hasKeyword = (vehicle, keyword) => {
    return vehicle?.keywords?.includes(keyword) || false;
};

export const getMaterialCostOfCard = (card: instantiatedCard, game: InstantiatedGame): number => {
    let cost = card.materialCost;
    if(cardEffects[card.meta.costModifier]) {
        cost += cardEffects[card.meta.costModifier]({card, game});
    }
    if(card.keywords.includes(KEYWORDS.HALF_COST)) {
        cost /= 2;
    }
    return cost;
};

export const canPlayerAffordCard = (game: InstantiatedGame, card: instantiatedCard, playerId: String) : boolean => {
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

export const payForCard = (inputGame: InstantiatedGame, card: instantiatedCard, playerId: String) => {
    const isAttackingPlayer = inputGame.attackingPlayerId === playerId;
    const {
        materialCost,
        cpCost
    } = card;

    const calcMaterialCost = hasKeyword(card, KEYWORDS.HALF_COST) ? materialCost / 2 : materialCost;

    if(isAttackingPlayer) {
        inputGame.attackingPlayerCp -= cpCost;
        inputGame.attackingPlayerMaterials -= calcMaterialCost;
    } else {
        inputGame.defendingPlayerCp -= cpCost;
        inputGame.defendingPlayerMaterials -= calcMaterialCost;
    }

    return inputGame;
};

export const canCardBePlayedToZoneType = (card: instantiatedCard, zoneType: string) => {
    if(card.type === CARD_TYPES.VEHICLE) {
        switch(card.vehicleType) {
            case VEHICLE_TYPES.SHIP: return zoneType === ZONE_TYPES.WATER || zoneType === ZONE_TYPES.BEACH;
            case VEHICLE_TYPES.SUB: return zoneType === ZONE_TYPES.WATER || zoneType === ZONE_TYPES.BEACH;
            case VEHICLE_TYPES.TANK: return zoneType === ZONE_TYPES.LAND || zoneType === ZONE_TYPES.BEACH;
            case VEHICLE_TYPES.AIRSHIP: return true;
            case VEHICLE_TYPES.PLANE: return true;
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

export const canCardBePlayedToZone = (game: InstantiatedGame, cardInstanceId: String, zoneId: String) => {
    const attackingPlayerCard = game.attackingPlayerHand.find(x => x.instanceId === cardInstanceId);
    const defendingPlayerCard = game.defendingPlayerHand.find(x => x.instanceId === cardInstanceId);
    const card:instantiatedCard = attackingPlayerCard || defendingPlayerCard;

    if(!card) {
        console.log('WARNING- trying to play card that does not exist in either players hand', {gameId: game.id, cardInstanceId});
    }

    const zone = game.zones.find(x => x.id === zoneId);

    // zone type not legal
    if(!canCardBePlayedToZoneType(card, zone.type )) return false;

    const enemyCards = attackingPlayerCard ? zone.defendingPlayerCards : zone.attackingPlayerCards;
    
    const isSubScreened = enemyCards.find(x => hasKeyword(x, KEYWORDS.SUB_SCREEN));
    const isAirScreened = enemyCards.find(x => hasKeyword(x, KEYWORDS.AIR_SCREEN));

    if(card.type === CARD_TYPES.VEHICLE) {
        if(card.vehicleType === VEHICLE_TYPES.SUB && isSubScreened) return false;
        if(card.vehicleType === VEHICLE_TYPES.PLANE && isAirScreened) return false;
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

export const doPlayersHaveNegativeResources = (game: InstantiatedGame) => (
    game.attackingPlayerCp < 0 || game.attackingPlayerMaterials < 0
    || game.defendingPlayerCp < 0 || game.defendingPlayerMaterials < 0
);