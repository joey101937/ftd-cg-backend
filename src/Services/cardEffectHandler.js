import { PrismaClient } from "@prisma/client";
import { FACTIONS, KEYWORDS } from "../gameConstants/gameSettings";
import { addCpToPlayer, getPlayerDeckInstance, getPlayerHand, shuffleMutating } from "../utils";
import { v4 as uuid } from "uuid";

const prismaClient = new PrismaClient();

export const cardEffects = {
    // draw a card and gain 1 cp
    marauderOnPlay: ({game, playerId, playingCard, actionBody}) => {
        const playersHand = getPlayerHand(game, playerId);
        const drawnCard = getPlayerDeckInstance(game, playerId).shift();
        playersHand.push(drawnCard);
        addCpToPlayer(game, playerId, 1);
        return true;
    },

    // draw a card and gain 1 cp
    crossbonesOnPlay: ({game, playerId, playingCard, actionBody}) => {
        const playersHand = getPlayerHand(game, playerId);
        const drawnCard = getPlayerDeckInstance(game, playerId).shift();
        addCpToPlayer(game, playerId, 1);
        playersHand.push(drawnCard);
        return true;
    },

    // reduce cost by 20k for each friendly dwg vehicle
    plundererCostModifier: ({game, playerId}) => {
        const isAttackingPlayer = game.attackingPlayerId === playerId;
        let numDwgVehicles = 0;
        game.zones.forEach(zone => {
            if(isAttackingPlayer) {
                numDwgVehicles += zone.attackingPlayerCards.filter(x => x.faction === FACTIONS.DWG);
            } else {
                numDwgVehicles += zone.defendingPlayerCards.filter(x => x.faction === FACTIONS.DWG);
            }
        });

        return numDwgVehicles * -20000;
    },

    // shuffle copy into deck that costs 0
    loggerheadOnDeath: ({game, playerId, playingCard}) => {
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
    reservesEffect: async ({game, playerId}) => {
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
            hand.push({
                ...cardPool.shift(),
                instanceId: uuid(),
            });
        }
        return true;
    },

    // spawns a non-temporary buccaneer into a zone. give it scrappy.
    spawnBuccaneerEffect: async ({game, playerId, actionBody}) => {
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

        arrayToAddTo.push({
            ...card,
            keywords: [KEYWORDS.SCRAPPY],
        });

        return true;
    },

    // Target DWG vehicle card in hand spawns an additional copy of that vehicle when played if it costs less than 400k
    doubleUpEffect: ({game, playerId, actionBody}) => {
        const {targetCardInstanceId} = actionBody;
        const hand = getPlayerHand(game, playerId);
        const targetCard = hand.find(x => x.instanceId === targetCardInstanceId);
        if(targetCard.materialCost > 400000) return false;

        if(targetCard.meta.additionalSpawns) {
            targetCard.meta.additionalSpawns += 1;
        } else {
            targetCard.meta.additionalSpawns = 1;
        }
        return true;
    }


};