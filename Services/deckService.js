import { PrismaClient } from '@prisma/client'
import { shuffle, uniqueId } from 'lodash';

const prismaClient = new PrismaClient();

export const getDecksOfUser = async (userId) => {
    if (!userId) return [];
    try {
        const data = await prismaClient.deck.findMany({
            where: {
                playerId: {
                    equals: userId
                }
            }
        });
        return { data, status: 200 };
    } catch (e) {
        console.log(`failed to get decks for user ${userId}`, e);
        return { data: [], error: e.message };
    }
};


export const getDeckById = async (deckId) => {
    return await prismaClient.deck.findFirst({
        where: {
            id: {
                equals: deckId
            }
        }
    });
}


export const createInstanceOfDeck = async (deck) => {
    const cardMap = deck.meta.cards;

    const cardIds = Object.keys(cardMap);

    const cards = await prismaClient.user.findMany({
        where: {
            id: {
                in: cardIds,
            }
        }
    });

    if (cards.length !== cardIds.length) {
        console.log('WARNING unexpected card count returned for deck', { deck, cards });
    }

    const output = [];

    cards.forEach(card => {
        for(let i = 0; i < cardMap[card.id]; i++) {
            output.push({
                ...card,
                instanceId: uniqueId(),
            })
        }
    });

    return shuffle(output);
}