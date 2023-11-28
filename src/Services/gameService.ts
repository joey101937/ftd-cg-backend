import { PrismaClient } from '@prisma/client';
import { createInstanceOfDeck, getDeckById } from './deckService';
import { STARTING_CP_AMOUNT, STARTING_HAND_SIZE } from '../gameConstants/gameSettings';
import { ServiceResponse } from '../gameConstants/schemas';
import { sanitizeGameForPlayer } from '../utils';

const prismaClient = new PrismaClient();

export const getGameById = async (gameId, requestingUserId): Promise<ServiceResponse> => {

    if(!gameId) return { status: 400, error: 'GameId required'};

    const game = await prismaClient.game.findFirst({
        where: {
            id: gameId,
        }
    });

    // @ts-ignore next-line
    return {status: 200, data: sanitizeGameForPlayer(game, requestingUserId)};
    
}

export const getGamesOfUser = async (userId: string, includeFinished: boolean) : Promise<ServiceResponse> => {
    if(!userId) throw new Error("UserId required");
    try {
        const queryObj = {
            where: {
                OR: [
                   { attackingPlayerId: userId },
                   { defendingPlayerId: userId },
                ]
            }
        };

        if(!includeFinished) {
            // @ts-ignore:next-line
            queryObj.where.status = {
                equals: 'active'
            };
        }

        const data = await prismaClient.game.findMany(queryObj)
        // @ts-ignore next-line
        return {data, status: 200};
    } catch(e) {
        console.log(`failed to get decks for user ${userId}`, e);
        return { status: 500, data: [], error: e.message };
    }
};


export const createGame = async (attackingPlayerId, defendingPlayerId, zoneLayout, attackingPlayerDeckId, defendingPlayerDeckId) => {

    const attackingPlayer = await prismaClient.user.findFirst({
        where: {
            id: {
                equals: attackingPlayerId
            }
        }
    });

    const defendingPlayer = await prismaClient.user.findFirst({
        where: {
            id: {
                equals: defendingPlayerId
            }
        }
    });
    
    console.log({attackingPlayer, defendingPlayer});

    if(!attackingPlayer || !defendingPlayer) {
        return { status: 400, error: 'player(s) not found'};
    }
    // @ts-ignore:next-line
    const attackingDeck = (await getDeckById(attackingPlayerDeckId || attackingPlayer.meta.activeDeckId));
    // @ts-ignore:next-line
    const defendingDeck = (await getDeckById(defendingPlayerDeckId || defendingPlayer.meta.activeDeckId));

    if(!attackingDeck || !defendingDeck) {
        return { status: 400, error: 'Both players must have their active deck set or manually provided' };
    }
    
    const attackingPlayerDeckInstance = await createInstanceOfDeck(attackingDeck);
    const defendingPlayerDeckInstance = await createInstanceOfDeck(defendingDeck);

    const attackingPlayerHand = [];
    const defendingPlayerHand = [];

    for(let i = 0; i < STARTING_HAND_SIZE; i++) {
        attackingPlayerHand.push(attackingPlayerDeckInstance.shift());
        defendingPlayerHand.push(defendingPlayerDeckInstance.shift());
    }


    const game = {
        zones: zoneLayout,
        isAttackingPlayersTurn: true,
        status: 'active',
        attackingPlayerId,
        defendingPlayerId,
        attackingPlayerUsername: attackingPlayer.username,
        defendingPlayerUsername: defendingPlayer.username,
        attackingPlayerDeckInstance,
        defendingPlayerDeckInstance,
        attackingPlayerHand,
        defendingPlayerHand,
        attackingPlayerCp: STARTING_CP_AMOUNT,
        defendingPlayerCp: STARTING_CP_AMOUNT,
        attackingPlayerAvailableHeroPowers: [], // todo
        defendingPlayerAvailableHeroPowers: [], // todo
        meta: {},
    };

    const dbResult = await prismaClient.game.create({data: game});

    return {data: dbResult, status: 200};
};

export const updateGameDbEntry = async (game) => {
    return await prismaClient.game.update({
        data: game,
        where: {
            id: game.id
        }
    });
};
