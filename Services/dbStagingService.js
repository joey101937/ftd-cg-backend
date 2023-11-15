import { PrismaClient } from "@prisma/client";
import { dwgVehicles } from "../gameConstants/builtInCards/DWG-built-in";
import { owVehicles } from "../gameConstants/builtInCards/OW-Built-in";
import { ssVehicles } from "../gameConstants/builtInCards/SS-built-in";
import { wfVehicles } from "../gameConstants/builtInCards/WF-built-in";
import { gtVehicles } from "../gameConstants/builtInCards/GT-built-in";


const prismaClient = new PrismaClient();

export const refreshBuiltInCards = async () => {
    try {
        // first delete all built in cards cards
        await prismaClient.card.deleteMany({
            where: {
                isBuiltIn: true,
            }
        });
        // then refresh them

        const cardsToInsert = [
           ...dwgVehicles,
           ...owVehicles,
           ...ssVehicles,
           ...wfVehicles,
           ...gtVehicles,
        ];

        await prismaClient.card.createMany({
            data: [...cardsToInsert],
        });

        return {status: 200 };

    } catch (e) {
        console.log('ERROR', e);
        return { status: 500, data: {error: e.message } };
    }
};