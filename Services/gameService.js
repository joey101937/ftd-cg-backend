import { PrismaClient } from '@prisma/client'
import { createInstanceOfDeck, getDeckById } from './deckService';
import { STARTING_CP_AMOUNT, STARTING_HAND_SIZE } from '../gameConstants/gameSettings';

const prismaClient = new PrismaClient();


export const getGamesOfUser = async (userId, includeFinished) => {
    if(!userId) return  [];
    try {
        const queryObj = {
            where: {
                OR: {
                    attackingPlayerId: {
                        equals: userId
                    },
                    defendingPlayerId: {
                        equals: userId
                    },
                }
            }
        };

        if(!includeFinished) {
            queryObj.where.OR.status = {
                equals: 'active'
            }
        }

        const data = await prismaClient.game.findMany(queryObj);
        return {data, status: 200};
    } catch(e) {
        console.log(`failed to get decks for user ${userId}`, e);
        return { status: 500, data: [], error: e.message };
    }
}


export const createGame = async (attackingPlayerId, defendingPlayerId, zoneLayout) => {

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
        return { data: null, status: 400, error: 'player(s) not found'};
    }

    const attackingDeck = (await getDeckById(attackingPlayer.meta.activeDeckId)) || testDefaultDeck;
    const defendingDeck = (await getDeckById(defendingPlayer.meta.activeDeckId)) || testDefaultDeck;

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
        defendingingPlayerCp: STARTING_CP_AMOUNT,
        attackingPlayerAvailableHeroPowers: [], // todo
        defendingPlayerAvailableHeroPowers: [], // todo
        meta: {},
    };

    const dbResult = await prismaClient.game.create(game);

    return {data: dbResult, status: 200};
}