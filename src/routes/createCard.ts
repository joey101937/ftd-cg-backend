import _ from 'lodash';
import { createCustomCard, getCustomCardsOfUser, isCustomCardPayloadValid } from "../Services/cardService";
import { getUserIdFromRequest } from "../Services/userService";


export type customCardRequestBody = {
    blueprintCost: number,
    name: string,
    vehicleType: string,
    imageUrl?: string,
    blueprint?: string | JSON , // the bp itself
}

/**
 * Gets requesting user's custom cards
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createCustomCardsHandler = async (req, res) => {
    
    const userId = getUserIdFromRequest(req);

    if (!userId) return res.status(401);

    if(!isCustomCardPayloadValid(req.body)) {
        return res.status(400).json({
            status: 400,
            error: 'Request body must contain correct parameters. blueprintCost (number), name (string), vehicleType (string), must be provided. imageUrl (string), and blueprint (json or string) are optional.'
        });
    }
    
    const result = await createCustomCard(userId, req.body);

    return res.status(result.status).json(result);
};
