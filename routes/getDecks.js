import { getDecksOfUser } from "../Services/deckService";
import { getUserIdFromRequest } from "../Services/userService";

/**
 * gets the decks that belong to requesting user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getDecksHandler = async (req, res) => {
    
    const userId = getUserIdFromRequest(req);

    if (!userId) return res.status(401);
    
    const result = await getDecksOfUser(userId);

    return res.status(result.status).json(result.data);
};
