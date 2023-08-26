
import { handleGameAction } from "../Services/gameActionService";
import { getUserIdFromRequest } from "../Services/userService";


/**
 * Accepts game action requests ie handles playing cards
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const gameActionHandler = async (req, res) => {
    
    const userId = getUserIdFromRequest(req);
    const {
        gameId,
        actionType,
        actionBody, // json details of action
    } = req.body;

    if (!userId) return res.status(401);
    
    const result = await handleGameAction({
        triggeringPlayerId: userId,
        gameId,
        actionType,
        actionBody
    });

    return res.status(result.status).json(result.data);
};
