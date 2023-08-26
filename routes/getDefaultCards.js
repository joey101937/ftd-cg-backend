import { getDefaultCards } from "../Services/cardService";

/**
 * Gets requesting user's custom cards
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getDefaultCardsHandler = async (req, res) => {
    
    const result = await getDefaultCards();

    return res.status(result.status).json(result.data);
};
