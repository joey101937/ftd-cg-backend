import { getCustomCardsOfUser } from "../Services/cardService";
import { getDecksOfUser } from "../Services/deckService";
import { getUserIdFromRequest } from "../Services/userService";


/**
 * Gets requesting user's custom cards
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCustomCardsHandler = async (req, res) => {
    
    const userId = getUserIdFromRequest(req);

    if (!userId) return res.status(401);
    
    const result = await getCustomCardsOfUser(userId);

    return res.status(result.status).json(result.data);
};
