export const STARTING_HAND_SIZE = 5;
export const STARTING_CP_AMOUNT = 3;

export const GAME_STATUSES = {
    ACTIVE: 'active',
    COMPLETE: 'complete',
    CANCELED: 'canceled',
};

export const GAME_ACTION_TYPES = {
    PLAY_CARD_TO_ZONE: 'PLAY_CARD_TO_ZONE', // Either plays vehicle or applies ability effect to zone
    ATTACK_ENEMY_BASE: 'ATTACK_ENEMY_BASE',
    START_FLEET_BATTLE: 'START_FLEET_BATTLE',
    END_TURN: 'END_TURN',
};

export const CARD_TYPES = {
    VEHICLE: 'vehicle',
    ABILITY: 'ability',
};

export const VEHICLE_TYPES = {
    SHIP: 'ship',
    TANK: 'tank',
    FLIER: 'flier',
    SUB: 'sub',
};

export const ZONE_TYPES = {
    WATER: 'water',
    BEACH: 'beach',
    LAND: 'land',
};

export const VEHICLE_KEYWORDS = {
    AIR_SCREEN: 'airScreen',
    SUB_SCREEN: 'subScreen',
    BLOCKER: 'blocker',
    SCRAPPY: 'scrappy',
    TEMPORARY: 'temporary',
    INOFFENSIVE: 'inoffensive',
    HALF_COST: 'halfCost', // for fliers, they are half cost by default
};


export const FACTIONS = {
    NEUTRAL: 'NEUTRAL',
    DWG: 'DWG',
    SS: 'SS',
    LH: 'LH',
    TG: 'TG',
    OW: 'OW',
    SD: 'SD',
    WF: 'WF',
    GT: 'GT',
};