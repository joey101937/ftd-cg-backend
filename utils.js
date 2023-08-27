

export const getPlayerHand = (game, playerId) => {
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


export const getPlayerDeckInstance = (game, playerId) => {
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

export const addCpToPlayer = (game, playerId, amount) => {
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
