import { refreshBuiltInCards } from "../Services/dbStagingService";


/**
 * Gets requesting user's custom cards
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const stageDbHandler = async (req, res) => {
    
    const result = await refreshBuiltInCards();

    return res.status(result.status).json(result);
};
