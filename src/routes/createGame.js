import { createGame } from "../Services/gameService";
import { standardZoneLayout } from "../gameConstants/zoneLayouts";

export const createGameHandler = async (req, res) => {
    
    const {attackingPlayerId, defendingPlayerId, zoneLayout = 'standard'} = req.body;

    if(!attackingPlayerId || !defendingPlayerId) return res.status(400).json({ error: 'attackingPlayerId and defendingPlayerId body attribute required' });

    let zoneLayoutToUse;

    switch(zoneLayout) {
        case 'standard':
            zoneLayoutToUse = standardZoneLayout;
            break;
        default: 
            return res.status(400).json({ error: 'missing zoneLayout body attribute' });

    }
    
    const result = await createGame(attackingPlayerId, defendingPlayerId, zoneLayoutToUse);

    return res.status(result.status).json(result);
};
