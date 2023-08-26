import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient();

export const getCustomCardsOfUser = async (userId) => {
    if(!userId) return  [];
    try {
        const data = await prismaClient.card.findMany({
            where: {
                playerId: {
                    equals: userId
                }
            }
        });
        return {status: 200, data};
    } catch(e) {
        console.log(`failed to get custom cards for user ${userId}`, e);
        return {
            status: 500,
            error: e.message,
        };
    }
};

export const getDefaultCards = async () => {
    try {
        const data = await prismaClient.card.findMany({
            where: {
                isBuiltIn: {
                    equals: true
                }
            }
        });
        return {status: 200, data};
    } catch(e) {
        console.log('failed to get default cards', e);
        return {
            status: 500,
            error: e.message,
        };
    }
};
