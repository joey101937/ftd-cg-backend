import { getGamesOfUser } from "../Services/gameService";
import { getUserIdFromRequest } from "../Services/userService";


/**
 * Gets all the games that the requesting user is in
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getMyGamesHandler = async (req, res) => {
    
    const { includeFinished } = req.query;

    const userId = getUserIdFromRequest(req);

    if (!userId) return res.status(401);
    
    const result = await getGamesOfUser(userId, !!includeFinished);

    return res.status(result.status).json(result.data);
};
