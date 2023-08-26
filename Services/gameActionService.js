import { PrismaClient } from "@prisma/client";
import { canCardBePlayedToZone, canPlayerAffordCard } from "./gameLogicService";
import { CARD_TYPES, GAME_ACTION_TYPES } from "../gameConstants/gameSettings";

const prismaClient = new PrismaClient();

// land is 6328e4bd-f7e5-45f7-926c-b637752f2d5a
// water is 1d41fb4a-2fed-4b9e-9f80-339544586844

const playCardToZoneHandler = async (game, actionBody, playerId) => {
    const {
        targetZoneId,
        cardInstanceId,
    } = actionBody;

    const isAttackingPlayer = game.attackingPlayerId === playerId;
    const isPlayersTurn = isAttackingPlayer ? game.isAttackingPlayersTurn : !game.isAttackingPlayersTurn;

    if (!isPlayersTurn) return { status: 400, error: 'Not players turn' };

    const playerHand = isAttackingPlayer ? game.attackingPlayerHand : game.defendingPlayerHand;

    const playingCard = playerHand.find(x => x.instanceId = cardInstanceId);

    const targetZone = game.zones.find(x => x.id === targetZoneId);

    if (!targetZone) {
        return { status: 400, data: { error: 'target zone not present in game' } };
    }

    if (!canPlayerAffordCard(game, playingCard, playerId)) {
        return { status: 400, data: { error: 'Player cannot afford that card' } };
    }

    if (!canCardBePlayedToZone(game, playingCard.instanceId, targetZoneId)) {
        return { status: 400, data: { error: 'That card cannot be legally played to that zone' } };
    }

    if (playingCard.type === CARD_TYPES.VEHICLE) {
        if (isAttackingPlayer) {
            targetZone.attackingPlayerCards.push(playingCard);
            game.attackingPlayerHand = game.attackingPlayerHand.filter(x => x.instanceId !== playingCard.instanceId);
        } else {
            targetZone.defendingPlayerCards.push(playingCard);
            game.defendingPlayerHand = game.defendingPlayerHand.filter(x => x.instanceId !== playingCard.instanceId);
        }
    }

    const updatedGame = await prismaClient.game.update({
        where: {
            id: game.id,
        },
        data: game
    });

    return { status: 200, data: updatedGame };

};

export const handleGameAction = async ({ triggeringPlayerId, gameId, actionType, actionBody }) => {

    if (!triggeringPlayerId || !gameId || !actionType || !actionBody) {
        return { status: 400, data: { error: 'Missing parameter. triggeringPlayerId, gameId, actionType, actionBody required' } }
    }

    const game = await prismaClient.game.findFirst({
        where: {
            id: {
                equals: gameId,
            },
            OR: {
                attackingPlayerId: { equals: triggeringPlayerId },
                defendingPlayerId: { equals: triggeringPlayerId }
            }
        }
    });

    if (!game) {
        return { status: 400, data: { error: `User is not in a game with given id ${gameId}` } }
    }

    switch (actionType) {
        case GAME_ACTION_TYPES.PLAY_CARD_TO_ZONE: return await playCardToZoneHandler(game, actionBody, triggeringPlayerId);
        default: return { status: 400, data: { error: `unknown actionType ${actionType}` } }
    }
}