import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient();

export const getDecksOfUser = async (userId) => {
    if(!userId) return  [];
    try {
        const data = await prismaClient.deck.findMany({
            where: {
                playerId: {
                    equals: userId
                }
            }
        });
        return {data, status: 200};
    } catch(e) {
        console.log(`failed to get decks for user ${userId}`, e);
        return { data: [], error: e.message };
    }
};
