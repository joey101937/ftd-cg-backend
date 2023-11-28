import { PrismaClient } from "@prisma/client";
import { CARD_TYPES, FACTIONS, KEYWORDS } from "../gameConstants/gameSettings";
import { addCpToPlayer, getPlayerDeckInstance, getPlayerHand, getRollOfOwner, shuffleMutating } from "../utils";
import { v4 as uuid } from "uuid";
import { InstantiatedGame, instantiatedCard } from "../gameConstants/schemas";

const prismaClient = new PrismaClient();

type onPlayPayload = {
    game: InstantiatedGame,
    playingCard: instantiatedCard, // card triggering effect
    playerId: string,
    actionBody: any,
}

type costModifierPayload = {
    game: InstantiatedGame,
    card: instantiatedCard,
}

export const cardEffects = {
    // draw a card and gain 1 cp
    marauderOnPlay: ({game, playerId}: onPlayPayload) => {
        const playersHand = getPlayerHand(game, playerId);
        const drawnCard = getPlayerDeckInstance(game, playerId).shift();
        playersHand.push(drawnCard);
        addCpToPlayer(game, playerId, 1);
        return true;
    },

    // draw a card and gain 1 cp
    crossbonesOnPlay: ({game, playerId}: onPlayPayload) => {
        const playersHand = getPlayerHand(game, playerId);
        const drawnCard = getPlayerDeckInstance(game, playerId).shift();
        addCpToPlayer(game, playerId, 1);
        playersHand.push(drawnCard);
        return true;
    },

    // reduce cost by 20k for each friendly dwg vehicle
    plundererCostModifier: ({game, card}: costModifierPayload) => {
        const isAttackingPlayer = getRollOfOwner(game, card.instanceId) === 'attacker';
        let numDwgVehicles = 0;
        game.zones.forEach(zone => {
            if(isAttackingPlayer) {
                numDwgVehicles += zone.attackingPlayerCards.filter(x => x.type === CARD_TYPES.VEHICLE && x.faction === FACTIONS.DWG).length;
            } else {
                numDwgVehicles += zone.defendingPlayerCards.filter(x => x.type === CARD_TYPES.VEHICLE && x.faction === FACTIONS.DWG).length;
            }
        });

        return numDwgVehicles * -20000;
    },

    // shuffle copy into deck that costs 0
    loggerheadOnDeath: ({game, playerId, playingCard}: onPlayPayload) => {
        const deck = getPlayerDeckInstance(game, playerId);
        deck.push({
            ...playingCard,
            instanceId: uuid(),
            materialCost: 0,
        });
        shuffleMutating(deck);
        return true;
    },

    // add 3 random dwg cards to ur hand
    reservesEffect: async ({game, playerId}: onPlayPayload) => {
        const hand = getPlayerHand(game, playerId);
        const cardPool = await prismaClient.card.findMany({
            where: {
                faction: {
                    equals: FACTIONS.DWG,
                },
                isBuiltIn: {
                    equals: true,
                },
                type: {
                    equals: 'vehicle'
                }
            }
        });
        shuffleMutating(cardPool);
        for(let i =0; i < 3; i++) {
            // @ts-ignore:next-line
            hand.push({
                ...cardPool.shift(),
                instanceId: uuid(),
            });
        }
        return true;
    },

    // spawns a non-temporary buccaneer into a zone. give it scrappy.
    spawnBuccaneerEffect: async ({game, playerId, actionBody}: onPlayPayload) => {
        const { targetZoneId } = actionBody;
        const isAttackingPlayer = playerId === game.attackingPlayerId;
        const targetZone = game.zones.find(x => x.id === targetZoneId);
        const arrayToAddTo = isAttackingPlayer ? targetZone.attackingPlayerCards : targetZone.defendingPlayerCards;

        const card = prismaClient.card.findFirst({
            where: {
                isBuiltIn: {
                    equals: true
                },
                name: {
                    equals: 'Buccaneer'
                }
            }
        });

        // @ts-ignore next-line
        arrayToAddTo.push({
            ...card,
            keywords: [KEYWORDS.SCRAPPY],
            instanceId: uuid(),
        });

        return true;
    },

    // Target DWG vehicle card in hand spawns an additional copy of that vehicle when played if it costs less than 400k
    doubleUpEffect: ({game, playerId, actionBody}: onPlayPayload) => {
        const {targetCardInstanceId} = actionBody;
        const hand = getPlayerHand(game, playerId);
        const targetCard = hand.find(x => x.instanceId === targetCardInstanceId);
        if(!targetCard || targetCard.materialCost > 400000) return false;

        if(targetCard.meta.additionalSpawns) {
            targetCard.meta.additionalSpawns += 1;
        } else {
            targetCard.meta.additionalSpawns = 1;
        }
        return true;
    }


};