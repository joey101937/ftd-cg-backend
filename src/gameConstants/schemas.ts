import { Card, Game } from ".prisma/client";
import Joi from "joi";

export const pendingChangeSchema = Joi.object({
    proposingPlayerId: Joi.string().required(),
    type: Joi.string().allow('battleReport').required(),
    // these are for battle reports
    cardsToDestroy: Joi.array().items(Joi.string()), // array of instance ids both vehicles and ongoing ability cards
    vehiclesToRepair: Joi.array().items(Joi.string()), // array of instance ids
    vehiclesToRemain: Joi.array().items(Joi.string()), // array of instance ids
    postBattleCardsPlayed: Joi.array().items(Joi.string()), // array of instance ids of cards in hand(s)
    heroPowersUsed: Joi.object(), // object mapping hero power instance id to target instance id (null means played without target)
});

export type pendingChange = {
    proposingPlayerId: string,
    type: string,
    cardsToDestroy: Array<String>, // instance ids of vehicles or ongoing ability cards
    vehiclesToRepair: Array<String>, // instance ids
    participatingCards: Array<String>,// instance ids
    battleCardsPlayed: Array<String>, // instance ids
    heroPowersUsed:Array<String>, // instance ids
}

export type Zone = {
    attackingPlayerCards: Array<instantiatedCard>,
    defendingPlayerCards: Array<instantiatedCard>,
    lastActivatedTurn: number,
    defendingPlayerHp: number
    attackingPlayerHp: number
    type: "water" | 'beach' | "land",
    id: string,
}

export type ServiceResponse = {
    status: number | string,
    data?: any,
    error?: string,
}

export type instantiatedCard = Card & {
    instanceId: string,
    keywords: Array<String>,
    meta: any,
}

/**
 * use this for game logic because primsa json doenst understand its own methods
 */
export type InstantiatedGame = {
id: string
status: string
meta: {
    alertCard: instantiatedCard,
    alertCardPlayerId: string, // player who set alert card
},
turnNumber: number
pendingChange: pendingChange
attackingPlayerId: string
defendingPlayerId: string
winningPlayerId: string | null
losingPlayerId: string | null
attackingPlayerUsername: string
defendingPlayerUsername: string
attackingPlayerDeckInstance: Array<instantiatedCard>
defendingPlayerDeckInstance: Array<instantiatedCard>
attackingPlayerHand: Array<instantiatedCard>
defendingPlayerHand: Array<instantiatedCard>
attackingPlayerCp: number
defendingPlayerCp: number
attackingPlayerMaterials: number
defendingPlayerMaterials: number
attackingPlayerAvailableHeroPowers: any
defendingPlayerAvailableHeroPowers: any
isAttackingPlayersTurn: boolean
zones: Array<Zone>
}