import { deleteUserDeck, upsertDeckOfUser } from "../Services/deckService";
import { getUserIdFromRequest } from "../Services/userService";


/**
 * Gets requesting user's custom cards
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const deleteDeckHandler = async (req, res) => {
    
    const userId = getUserIdFromRequest(req);

    if (!userId) return res.status(401);

    const { deckId } = req.params;

    if(!deckId) res.status(400).json({ error: "Deck id url param is required" });

    const data = await deleteUserDeck(userId, deckId);

    return res.status(data.status).json(data);
};
