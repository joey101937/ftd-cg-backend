import Joi from "joi";

export const pendingChange = Joi.object({
    proposingPlayerId: Joi.string().required(),
    type: Joi.string().allow('battleReport').required(),
    // these are for battle reports
    cardsToDestroy: Joi.array().items(Joi.string()), // array of instance ids both vehicles and ongoing ability cards
    vehiclesToRepair: Joi.array().items(Joi.string()), // array of instance ids
    vehiclesToRemain: Joi.array().items(Joi.string()), // array of instance ids
    postBattleCardsPlayed: Joi.array().items(Joi.string()), // array of instance ids of cards in hand(s)
    heroPowersUsed: Joi.object(), // object mapping hero power instance id to target instance id (null means played without target)
});

export const zone = Joi.object({
    attackingPlayerCards: Joi.array().items(Joi.object()),
    defendingPlayerCards: Joi.array().items(Joi.object()),
    lastActivatedTurn: Joi.number().allow(null),
    defendingPlayerHp: Joi.number().allow(null),
    attackingPlayerHp: Joi.number().allow(null),
    type: Joi.string().allow('water', 'beach', 'land').required(),
    id: Joi.string().required(),
});