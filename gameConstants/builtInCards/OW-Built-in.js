import { FACTIONS, TRIGGERS, KEYWORDS, VEHICLE_TYPES } from "../gameSettings";

export const owVehicles = [
    {
        name: 'Bulwark',
        isBuiltIn: true,
        cardText: '',
        materialCost: 460000,
        blueprintCost: 466000,
        cpCost: 0,
        imageUrl: 'bulwark.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.AIR_SCREEN, KEYWORDS.HALF_COST],
        meta: {
        }
    },
    {
        name: 'Trebuchet',
        isBuiltIn: true,
        cardText: 'When Played, you may choose to have this vehicle battle an opponents vehicle from the same zone in a 1v1. If the trebuchet wins without becoming damaged beyond repair, fully heal it and you may repeat this effect.',
        materialCost: 500000,
        blueprintCost: 506000,
        cpCost: 0,
        imageUrl: 'trebuchet.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
        meta: {
            [TRIGGERS.PLAY_ON_VEHICLE]: 'trebuchetEffect',
        }
    },
    {
        name: 'Sub Killer',
        isBuiltIn: true,
        cardText: 'Target an enemy submarine or plane vehicle. Remove it from play.',
        materialCost: 0,
        blueprintCost: 0,
        cpCost: 2,
        imageUrl: 'subKiller.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_VEHICLE]: 'subKillerEffect',
        }
    },    
    {
        name: 'Special Foundries',
        isBuiltIn: true,
        cardText: 'Draw a random player made card from your deck. Give it blocker',
        materialCost: 0,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'specialFoundries.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_PLAY]: 'specialFoundriesEffect',
        }
    },{
        name: 'Claymore',
        isBuiltIn: true,
        cardText: 'Draw a card when played',
        materialCost: 80000,
        blueprintCost: 84600,
        cpCost: 0,
        imageUrl: 'claymore.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_PLAY]: 'claymoreEffect'
        }
    },
    {
        name: 'Palisade',
        isBuiltIn: true,
        cardText: 'Draw a card when played',
        materialCost: 310000,
        blueprintCost: 317000,
        cpCost: 0,
        imageUrl: 'palisade.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_PLAY]: 'palisadeEffect'
        }
    },{
        name: 'Defensive Parapet',
        isBuiltIn: true,
        cardText: 'Spawn two parapets into a zone. They gain Inoffensive, Scrappy, and blocker keywords.',
        materialCost: 200000,
        blueprintCost: 0,
        cpCost: 2,
        imageUrl: 'defensiveParapet.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_ZONE]: 'defensiveParapetEffect',
        }
    },{
        name: 'The Onyx Throne',
        isBuiltIn: true,
        cardText: 'Whenever this vehicle would partake in a defensive battle, spawn any other OW vehicle that costs less than 800k alongside it',
        materialCost: 500000,
        blueprintCost: 492482,
        cpCost: 0,
        imageUrl: 'onyxthrone.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.INOFFENSIVE]
    },
    {
        name: 'Eyrie',
        isBuiltIn: true,
        cardText: 'Whenever this vehicle would partake in a defensive battle, spawn any other OW vehicle alongside it',
        materialCost: 400000,
        blueprintCost: 781362,
        cpCost: 0,
        imageUrl: 'Eyrie.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER]
    },
    {
        name: 'Rook',
        isBuiltIn: true,
        cardText: 'Gain 1cp when played',
        materialCost: 50000,
        blueprintCost: 98841,
        cpCost: 0,
        imageUrl: 'Rook.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.ship,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        keywords: []
    },{
        name: 'Partisan',
        isBuiltIn: true,
        cardText: 'When this card is destroyed, draw a random player made card from your deck',
        materialCost: 50000,
        blueprintCost: 50125,
        cpCost: 0,
        imageUrl: 'Partisan.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.ship,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_DEATH]: 'partisanEffect'
        }
    },
    {
        name: 'Halberd',
        isBuiltIn: true,
        cardText: '',
        materialCost: 120000,
        blueprintCost: 121363,
        cpCost: 0,
        imageUrl: 'halberd.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.ship,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        keywords: [KEYWORDS.SUB_SCREEN],
        meta: {
        }
    },
    {
        name: 'Mandrel',
        isBuiltIn: true,
        cardText: 'When played, draw a card. This card may move to a different water or beach zone up to once per turn',
        materialCost: 150000,
        blueprintCost: 155000,
        cpCost: 0,
        imageUrl: 'mandrel.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.ship,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
        }
    },
    {
        name: 'Clydesdale',
        isBuiltIn: true,
        cardText: 'If played into a zone in which you have no friendly vehicles, refund 100k of the cost. otherwise, draw a card',
        materialCost: 150000,
        blueprintCost: 153000,
        cpCost: 0,
        imageUrl: 'clydesdale.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.ship,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_PLAY]: 'clydesdaleEffect' 
        }
    },
    {
        name: 'Cauldron',
        isBuiltIn: true,
        cardText: 'When played, put a random submarine card from your deck into your hand (if you have one)',
        materialCost: 100000,
        blueprintCost: 102000,
        cpCost: 0,
        imageUrl: 'Cauldron.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.ship,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_PLAY]: 'CauldronEffect' 
        }
    },
];