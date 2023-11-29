import { InstantiatedGame, instantiatedCard } from "./gameConstants/schemas";
import { cloneDeep } from "lodash";

export const getPlayerHand = (game: InstantiatedGame, playerId) : Array<instantiatedCard> => {
    let isAttackingPlayer = false;
    if(game.attackingPlayerId === playerId) {
        isAttackingPlayer = true;
    }

    if(!isAttackingPlayer && game.attackingPlayerId !== playerId) {
        console.log('warning trying to get hand of player who is not in the game');
        return [];
    }

    return isAttackingPlayer ? game.attackingPlayerHand : game.defendingPlayerHand;
};

export const getActiveCardsOfPlayer = (game, playerId): Array<instantiatedCard> => {
    const out = [];
    let isAttackingPlayer = false;
    if(game.attackingPlayerId === playerId) {
        isAttackingPlayer = true;
    }
    game.zones.forEach(zone => {
        const array = isAttackingPlayer ? zone.attackingPlayerCards : zone.defendingPlayerCards;
        out.concat(array);
    });

    return out;
};

export const removeCardFromPlay = (game, instanceId) => {
    game.zones.forEach(zone => {
        zone.attackingPlayerCards = zone.attackingPlayerCards.filter(x => x.instanceId !== instanceId);
        zone.defendingPlayerCards = zone.defendingPlayerCards.filter(x => x.instanceId !== instanceId);
    });
};

export const removeCardFromHand = (game, instanceId) => {
    game.attackingPlayerHand = game.attackingPlayerHand.filter(x => x.instanceId !== instanceId);
    game.defendingPlayerHand = game.defendingPlayerHand.filter(x => x.instanceId !== instanceId);
};

export const getRollOfOwner = (game: InstantiatedGame, instanceId): String => {
    let out = null;
    game.zones.forEach(zone => {
        if(zone.attackingPlayerCards.find(x => x.instanceId === instanceId)) out = 'attacker';
        if(zone.defendingPlayerCards.find(x => x.instanceId === instanceId)) out = 'defender';
    });
    if(game.attackingPlayerHand.find(x => x.instanceId === instanceId)) out = 'attacker';
    if(game.defendingPlayerHand.find(x => x.instanceId === instanceId)) out = 'defender';
    return out;
};

export const getRollOfPlayerId = (game: InstantiatedGame, playerId): String => {
    let out = null;
    if(game.attackingPlayerId === playerId) return 'attacker';
    if(game.defendingPlayerId === playerId) return 'defender;'
    return out;
};

export const spendResourcesForPlayer = (game: InstantiatedGame, playerId, materials, cp) => {
    const isAttackingPlayer = game.attackingPlayerId === playerId;
    if(isAttackingPlayer) {
        game.attackingPlayerMaterials -= materials;
        game.attackingPlayerCp -= cp;
    } else {
        game.defendingPlayerMaterials -= materials;
        game.defendingPlayerCp -= cp;
    }
};

export const getPlayerDeckInstance = (game: InstantiatedGame, playerId): Array<instantiatedCard>=> {
    let isAttackingPlayer = false;
    if(game.attackingPlayerId === playerId) {
        isAttackingPlayer = true;
    }

    if(!isAttackingPlayer && game.attackingPlayerId !== playerId) {
        console.log('warning trying to get deck of player who is not in the game');
        return [];
    }

    return isAttackingPlayer ? game.attackingPlayerDeckInstance : game.defendingPlayerDeckInstance;
};

export const addCpToPlayer = (game: InstantiatedGame, playerId, amount) => {
    let isAttackingPlayer = false;
    if(game.attackingPlayerId === playerId) {
        isAttackingPlayer = true;
    }

    if(!isAttackingPlayer && game.attackingPlayerId !== playerId) {
        console.log('warning trying to get cp of player who is not in the game');
    }

    if(isAttackingPlayer) {
        game.attackingPlayerCp += amount;
    } else {
        game.defendingPlayerCp += amount;
    }
};

export const sanitizeGameForPlayer = (game: InstantiatedGame, playerId) => {
    const playerRoll = getRollOfPlayerId(game, playerId);

    const out: InstantiatedGame = cloneDeep(game);

    if(playerRoll !== 'attacker') {
       delete out.attackingPlayerDeckInstance;
       // @ts-ignore next-line
       out.attackingPlayerDeckSize = game.attackingPlayerDeckInstance.length;

       delete out.attackingPlayerHand;
       // @ts-ignore next-line
       out.attackingPlayerHandSize = game.attackingPlayerHand.length;
    }

    if(playerRoll !== 'defender') {
        delete out.defendingPlayerDeckInstance;
        // @ts-ignore next-line
        out.defendingPlayerDeckSize = game.defendingPlayerDeckInstance.length;
        
        delete out.defendingPlayerHand;
        // @ts-ignore next-line
        out.defendingPlayerHandSize = game.defendingPlayerHand.length;
     }

    return out;
}

export const addToRecentlyPlayedCards = (game: InstantiatedGame, card: instantiatedCard) => {
    const arr = game.meta.recentlyPlayedCards || [];
    arr.push(card);
    game.meta.recentlyPlayedCards = arr;
};

export const isPlayersTurn = (game: InstantiatedGame, playerId) => {
    const isAttackingPlayer = game.attackingPlayerId === playerId;
    return isAttackingPlayer ? game.isAttackingPlayersTurn : !game.isAttackingPlayersTurn;
}

/**
 * shuffles but mutates the given array
 * @param {*} array array to shuffle
 * @returns the input
 */
export const shuffleMutating = (array) => {

    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  };
