import { getGameById } from "../Services/gameService";
import { getUserIdFromRequest } from "../Services/userService";


/**
 * Gets all the games that the requesting user is in
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getGameByIdHandler = async (req, res) => {

    const userId = getUserIdFromRequest(req);

    if (!userId) return res.status(401);

    const result = await getGameById(req.params.gameId, userId);

    return res.status(result.status).json(result);
};
