import { Card, Deck, PrismaClient } from '@prisma/client';
import { shuffle, uniq, uniqBy } from 'lodash';
import { v4 as uuid } from 'uuid';
import { DECK_SIZE, PLAYER_CARD_LIMIT, UNIQUE_COPY_LIMIT } from '../gameConstants/gameSettings';
import { ServiceResponse, instantiatedCard } from '../gameConstants/schemas';

const prismaClient = new PrismaClient();

export const isDeckValid = async ({meta: { cards, isUnrestricted }}) => {
    if(isUnrestricted) return { result: true };
    
    if(!cards) return { result: false, error: 'Deck misformatted'};

    const cardIds = uniq(Object.keys(cards));
    const cardArray = await prismaClient.card.findMany({
        where: {
            id: {
                in: cardIds
            }
        }
    });
    if(cardIds.length !== cardArray.length) {
        return {
            result: false,
            error: 'Deck references card(s) that does not exist'
        };
    }
    if(uniqBy(cardArray.filter(x => !!x.isBuiltIn), 'faction').length > 1) {
        return {
            result: false,
            error: 'Deck contains cards from more than one AI faction'
        };
    }
    
    let numPlayerCards = 0;
    let numBuiltInCards = 0;
    let copyLimitExceeded = false;

    Object.keys(cards).forEach(cardId => {
        if(cards[cardId] > UNIQUE_COPY_LIMIT) copyLimitExceeded = true;
        const card = cardArray.find(x => x.id === cardId);
        if(card.isBuiltIn) numBuiltInCards += cards[cardId];
        else numPlayerCards += cards[cardId];
    });

    if(copyLimitExceeded) {
        return { result: false, error: `Deck can only have ${UNIQUE_COPY_LIMIT} copies of the same card`};
    }
    
    if((numBuiltInCards + numPlayerCards) !== DECK_SIZE) {
        return {
            result: false,
            error: `Deck must have ${DECK_SIZE} cards.`,
        };
    }

    if(numPlayerCards > PLAYER_CARD_LIMIT) return { result: false, error: `Too many player cards. Limit ${PLAYER_CARD_LIMIT}` };

    return { result: true };
};

export const getDecksOfUser = async (userId) : Promise<ServiceResponse> => {
    if (!userId) throw new Error("UserId is required");
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
        return { data: [], error: e.message, status: 500 };
    }
};

export const upsertDeckOfUser = async(userId, deck) : Promise<ServiceResponse> => {
if(!userId) throw new Error('User Id required');
    
    const {result, error} = await isDeckValid(deck);
    
    if(!result) {
        return {
            error,
            status: 400,
        };
    }

    deck.playerId = userId;

    let dbRes = undefined;

    if (deck.id) {
        const existingDeck = await prismaClient.deck.findFirst({
            where: {
                id: deck.id,
                playerId: userId
            }
        });
        if(!existingDeck) return { status: 400, error: "No deck with that ID to update. To create a deck do not specify id"};
        
        dbRes = await prismaClient.deck.update({
            data: deck,
            where: {
                id: deck.id,
            }
        });
    } else {
        dbRes = await prismaClient.deck.create({
            data: deck
        });
    }

    console.log('db res is ', dbRes);

    return { status: 200, data: dbRes};
};

export const deleteUserDeck = async (userId, deckId) : Promise<ServiceResponse> => {
    if(!userId || !deckId) throw new Error('UserId and DeckId required');

    const existingDeck =  await prismaClient.deck.findFirst({
        where: {
            id: deckId,
            playerId: userId
        }
    });

    if(!existingDeck) return {status: 400, error: 'Deck doesnt exist'};
    
    const data = await prismaClient.deck.delete({
        where: {
            id: deckId
        }
    });

    return {status: 200, data};
};


export const getDeckById = async (deckId) : Promise<Deck> => {
    return await prismaClient.deck.findFirst({
        where: {
            id: {
                equals: deckId
            }
        }
    });
};

export const createInstanceOfDeck = async (deck) : Promise<Array<instantiatedCard>> => {
    const cardMap = deck.meta.cards;

    const cardIds = Object.keys(cardMap);

    const cardsFound = await prismaClient.card.findMany({
        where: {
            id: {
                in: cardIds,
            }
        }
    });

    if (cardsFound.length !== cardIds.length) {
        console.log('WARNING unexpected card count returned for deck', { deck, cardsFound, cardIds });
    }

    const output = [];

    cardsFound.forEach(card => {
        for(let i = 0; i < cardMap[card.id]; i++) {
            output.push({
                ...card,
                instanceId: uuid(),
            });
        }
    });

    return shuffle(output);
};