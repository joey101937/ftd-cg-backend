import { FACTIONS, TRIGGERS, KEYWORDS, VEHICLE_TYPES } from "../gameSettings";

export const lhVehicles = [
    {
        name: 'Ampere',
        isBuiltIn: true,
        cardText: '',
        materialCost: 200000,
        blueprintCost: 206000,
        cpCost: 0,
        imageUrl: 'ampere.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [],
        meta: {
        }
    },
    {
        name: 'Coulomb',
        isBuiltIn: true,
        cardText: 'When this vehicle is destroyed, draw a card',
        materialCost: 120000,
        blueprintCost: 124000,
        cpCost: 0,
        imageUrl: 'Coulomb.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [],
        meta: {
            [TRIGGERS.ON_DEATH]: 'coulombEffect'
        }
    },
    {
        name: 'Umbra',
        isBuiltIn: true,
        cardText: '',
        materialCost: 148000,
        blueprintCost: 148000,
        cpCost: 0,
        imageUrl: 'umbra.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.SUB,
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [KEYWORDS.STEALTHY],
        meta: {
        }
    },
    {
        name: 'Conduit',
        isBuiltIn: true,
        cardText: 'When this vehicle is destroyed, draw a player made ship or tank card',
        materialCost: 90000,
        blueprintCost: 98000,
        cpCost: 0,
        imageUrl: 'conduit.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [],
        meta: {
            [TRIGGERS.ON_DEATH]: 'conduitEffect'
        }
    },
    {
        name: 'Thunderbird',
        isBuiltIn: true,
        cardText: '',
        materialCost: 160000,
        blueprintCost: 168000,
        cpCost: 0,
        imageUrl: 'thunderbird.png',
        playerId: null,
        vehicleType: 'plane',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [KEYWORDS.TEMPORARY, KEYWORDS.HALF_COST],
        meta: {
        }
    },
    {
        name: 'Quadrupole',
        isBuiltIn: true,
        cardText: '',
        materialCost: 540000,
        blueprintCost: 545000,
        cpCost: 0,
        imageUrl: 'quadrupole.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.SCRAPPY],
        meta: {
        }
    },
    {
        name: 'Terawatt',
        isBuiltIn: true,
        cardText: '',
        materialCost: 680000,
        blueprintCost: 687000,
        cpCost: 0,
        imageUrl: 'terawatt.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [],
        meta: {
        }
    },
    {
        name: 'Angstrom',
        isBuiltIn: true,
        cardText: '',
        materialCost: 540000,
        blueprintCost: 543000,
        cpCost: 0,
        imageUrl: 'angstrom.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [],
        meta: {
        }
    },
    // {
    //     name: 'Exajoule',
    //     isBuiltIn: true,
    //     cardText: 'When played, gain 1 cp',
    //     materialCost: 700000,
    //     blueprintCost: 900000,
    //     cpCost: 0,
    //     imageUrl: 'exajoule.png',
    //     playerId: null,
    //     vehicleType: 'ship',
    //     type: 'vehicle',
    //     faction: FACTIONS.LH,
    //     blueprintId: null,
    //     keywords: [KEYWORDS.BLOCKER],
    //     meta: {
    //     }
    // },
    {
        name: 'Candela',
        isBuiltIn: true,
        cardText: 'When played, gain 1 cp',
        materialCost: 800000,
        blueprintCost: 878000,
        cpCost: 0,
        imageUrl: 'candela.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.SUB_SCREEN],
        meta: {
        }
    },
    {
        name: 'Hydrovolt',
        isBuiltIn: true,
        cardText: '',
        materialCost: 260000,
        blueprintCost: 268000,
        cpCost: 0,
        imageUrl: 'hydrovolt.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.SUB,
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [KEYWORDS.SUB_SCREEN],
        meta: {
        }
    },
    {
        name: 'Rectifier',
        isBuiltIn: true,
        cardText: '',
        materialCost: 700000,
        blueprintCost: 734000,
        cpCost: 0,
        imageUrl: 'rectifier.png',
        playerId: null,
        vehicleType: 'plane',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [KEYWORDS.HALF_COST, KEYWORDS.TEMPORARY],
        meta: {
        }
    },
    {
        name: 'Sapphire',
        isBuiltIn: true,
        cardText: 'When this vehicle is played into an empty zone, draw a card and refund its cost',
        materialCost: 30000,
        blueprintCost: 37085,
        cpCost: 0,
        imageUrl: 'sapphire.png',
        playerId: null,
        vehicleType: 'plane',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [KEYWORDS.MOBILE, KEYWORDS.STEALTHY],
        meta: {
            [TRIGGERS.ON_PLAY]: 'sapphireEffect'
        }
    },
    {
        name: 'Sapphire Screen',
        isBuiltIn: true,
        cardText: 'Spawn a friendly Sapphire into each zone. They have MOBILE and STEALTHY keywords',
        materialCost: 90000,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'sapphireScreen.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.LH,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_PLAY]: 'sapphireScreenEffect'
        }
    },
     {
        name: 'Orbit',
        isBuiltIn: true,
        cardText: 'If you have 140k or more resources, spawn an additional orbit and this card loses HALFCOST keyword',
        materialCost: 140000,
        blueprintCost: 147000,
        cpCost: 0,
        imageUrl: 'orbit.png',
        playerId: null,
        vehicleType: 'plane',
        type: 'vehicle',
        faction: FACTIONS.LH,
        blueprintId: null,
        keywords: [KEYWORDS.HALF_COST, KEYWORDS.TEMPORARY],
        meta: {
            [TRIGGERS.ON_PLAY]: 'orbitEffect',
        }
    },
    {
        name: 'Orbit Flank',
        isBuiltIn: true,
        cardText: 'Choose an enemy ship or tank. It fights alone against an orbit',
        materialCost: 0,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'orbitFlank.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.LH,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_VEHICLE]: 'orbitFlankEffect'
        }
    },
    
    
    

];