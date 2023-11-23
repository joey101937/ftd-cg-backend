import { upsertDeckOfUser } from "../Services/deckService";
import { getUserIdFromRequest } from "../Services/userService";


/**
 * Gets requesting user's custom cards
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const upsertDeckHandler = async (req, res) => {
    
    const userId = getUserIdFromRequest(req);

    if (!userId) return res.status(401);
    
    console.log(req.body);
    const result = await upsertDeckOfUser(userId, req.body);

    return res.status(result.status || 201).json(result);
};
