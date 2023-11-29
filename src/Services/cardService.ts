import {  Card, PrismaClient, blueprint } from '@prisma/client';
import { v4 as uuid } from 'uuid'; 
import { ServiceResponse } from '../gameConstants/schemas';
import { CARD_TYPES, FACTIONS, KEYWORDS, VEHICLE_TYPES } from '../gameConstants/gameSettings';
import { customCardRequestBody } from '../routes/createCard';

const prismaClient = new PrismaClient();

/**
 * Image urls must be hosted on ibb and be in their domain for security purposes
 * @param givenUrl url to evaluate
 * @returns if it is acceptable
 */
const validateCustomImageUrl = (givenUrl) => {
    return /https:\/\/ibb.co\/[0-9A-z]*$/.test(givenUrl);
}

export const isCustomCardPayloadValid = (payload): boolean => {
    if(!payload.name || !payload.blueprintCost || !payload.vehicleType) {
        return false;
    }

    if(!Object.values(VEHICLE_TYPES).includes(payload.vehicleType)) {
        return false;
    }

    return true;
}

export const createCustomCard = async (userId, payload: customCardRequestBody) : Promise<ServiceResponse> => {

    if(payload.imageUrl && !validateCustomImageUrl(payload.imageUrl)) {
        return { status: 400, error: 'Custom images must be hosted at imgbb.com '}
    }

    if(!isCustomCardPayloadValid(payload)) {
        return {status: 400, error: 'Create custom card payload failed validation'};
    }

    const card: Card = {
        name: payload.name,
        imageUrl: payload.imageUrl,
        playerId: userId,
        cpCost: 0,
        materialCost: Math.ceil(payload.blueprintCost/5000)*5000, // round up to nearest 5k
        faction: FACTIONS.NEUTRAL,
        type: CARD_TYPES.VEHICLE,
        vehicleType: payload.vehicleType,
        isBuiltIn: false,
        blueprintCost: payload.blueprintCost,
        blueprintId: undefined,
        cardText: '',
        id: (uuid()),
        meta: {},
        keywords: {
            [VEHICLE_TYPES.PLANE]: [KEYWORDS.HALF_COST, KEYWORDS.TEMPORARY],
            [VEHICLE_TYPES.AIRSHIP]: [KEYWORDS.FRAGILE],
            [VEHICLE_TYPES.TANK]: [],
            [VEHICLE_TYPES.SHIP]: [],
            [VEHICLE_TYPES.SUB]: []
        }[payload.vehicleType] 
    };

    if(payload.blueprint) {
        const jsonBlueprint =  typeof payload.blueprint === 'string' ? JSON.parse(payload.blueprint) : payload.blueprint;
        const createdBlueprint = await prismaClient.blueprint.create({
            data: {
                name: card.name,
                blueprintCost: payload.blueprintCost,
                blueprintRaw: jsonBlueprint,
            }
        });

        card.blueprintId = createdBlueprint.id;
    }

    const createdCard = await prismaClient.card.create({
        data: card
    });

    return { status: 200, data: createdCard };
};

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

export const getDefaultCards = async () : Promise<ServiceResponse> => {
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
