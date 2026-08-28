const { KEYWORDS } = require("../../gameSettings");

const dwgNew = [
    {
        name: 'Sinners Luck',
        isBuiltIn: true,
        cardText: '',
        materialCost: 250000,
        blueprintCost: 267000,
        cpCost: 0,
        imageUrl: 'sinnersluck.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
        meta: {
        }
    },
];

const dwgUpdated = [
    {
        name: 'Albacore',
        isBuiltIn: true,
        cardText: 'While this vehicle is alive, you may not play any other aircraft into this zone',
        materialCost: 260000,
        blueprintCost: 261000,
        cpCost: 0,
        imageUrl: 'albacore.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.FRAGILE],
        meta: {
        }
    },
    {
        name: 'Tarpon',
        isBuiltIn: true,
        cardText: 'While this vehicle is alive, you may not play any other aircraft into this zone',
        materialCost: 510000,
        blueprintCost: 511605,
        cpCost: 0,
        imageUrl: 'ransack.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.FRAGILE],
        meta: {
        }
    },
    {
        name: 'Buccaneer',
        isBuiltIn: true,
        cardText: '',
        materialCost: 200000,
        blueprintCost: 296000,
        cpCost: 0,
        imageUrl: 'buccaneer.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [],
        meta: {
        }
    },
    {
        name: 'Double Up',
        isBuiltIn: true,
        cardText: 'Target DWG ship card in hand That costs less than 400k. spawns an additional copy of that ship when played',
        materialCost: 0,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'doubleUp.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_CARD]: 'doubleUpEffect',
        }
    }
];

const ssNew = [
    {
        name: 'Chrysaor',
        isBuiltIn: true,
        cardText: 'While you have more than 200k resources, this card costs 100k more and spawns in a second Chrysaor',
        materialCost: 100000,
        blueprintCost: 116000,
        cpCost: 0,
        imageUrl: 'Chrysaor.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.STEALTHY],
        meta: {
        }
    },
    {
        name: 'Paladin',
        isBuiltIn: true,
        cardText: 'While you have less than 240k materials, this can be played with halfcost and temporary',
        materialCost: 240000,
        blueprintCost: 240000,
        cpCost: 0,
        imageUrl: 'paladin.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [],
        meta: {
        }
    },
    {
        name: 'Argonaut',
        isBuiltIn: true,
        cardText: '',
        materialCost: 90000,
        blueprintCost: 94000,
        cpCost: 0,
        imageUrl: 'Argonaut.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
        meta: {
        }
    },
    {
        name: 'Blockade',
        isBuiltIn: true,
        cardText: 'Choose a zone, whenever the opponent plays a vehicle into that zone while you have at least one vehicle there, a fleet battle immediately begins in that zone. If you lose with no surviving vehicles, the blockade goes away, otherwise it remains.',
        materialCost: 100000,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'blockade.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.SS,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_ZONE]: 'blockadeEffect',
            [TRIGGERS.ON_BATTLE_DEFEAT]: 'blockadeLossEffect'
        }
    },
    {
        name: 'Nothung',
        isBuiltIn: true,
        cardText: 'Whenever this vehicle is played into a zone, also create a friendly Sacrilego in that zone',
        materialCost: 470000,
        blueprintCost: 478000,
        cpCost: 0,
        imageUrl: 'nothung.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER],
        meta: {
        }
    },
    {
        name: 'Balmung',
        isBuiltIn: true,
        cardText: 'When this is played into a zone, create a hydra card in hand and reduce its cost to zero',
        materialCost: 630000,
        blueprintCost: 636000,
        cpCost: 0,
        imageUrl: 'balmung.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER],
        meta: {
        }
    }
    , {
        name: 'Asphodel',
        isBuiltIn: true,
        cardText: '',
        materialCost: 470000,
        blueprintCost: 544000,
        cpCost: 0,
        imageUrl: 'asphodel.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.AIR_SCREEN],
        meta: {
        }
    }
];

const ssDeleted = [
    {
        name: 'Rhea',
        isBuiltIn: true,
        cardText: 'When played, put a random SS plane with a base cost under 300k into your hand. Remove its temporary keyword',
        materialCost: 560000,
        blueprintCost: 563000,
        cardText: '',
        cpCost: 0,
        imageUrl: 'rhea.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER],
        meta: {
        }
    }
];

const ssUpdated = [
    {
        name: 'Repairmen Ready',
        isBuiltIn: true,
        cardText: 'Grant target vehicle scrappy. If the target is an AI vehicle that costs less than 400k, draw a card.',
        materialCost: 0,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'repairmenReady.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.SS,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_VEHICLE]: 'repairmenReadyEffect'
        }
    },
    {
        name: 'Victoria',
        isBuiltIn: true,
        cardText: 'Each turn you may spend 200k resources to spawn another victoria into this zone',
        materialCost: 250000,
        blueprintCost: 270185,
        cpCost: 0,
        imageUrl: 'victoria.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [],
        meta: {
        }
    },
    {
        name: 'Braveheart',
        isBuiltIn: true,
        cardText: 'Once per turn, you may pay 1cp to have this ship 1v1 an enemy vehicle in the same zone',
        materialCost: 350000,
        blueprintCost: 371000,
        cpCost: 0,
        imageUrl: 'Braveheart.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [],
        meta: {
        }
    }
];

const wfNew = [
    {
        name: 'Harbringer',
        isBuiltIn: true,
        cardText: 'Whenever this ship is in fleet combat, you may spawn in one WF ship that costs <=100k to join the battle',
        materialCost: 550000,
        blueprintCost: 551000,
        cpCost: 0,
        imageUrl: 'harbringer.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [KEYWORDS.SUB_SCREEN],
        meta: {
        }
    },
    {
        name: 'Pontus',
        isBuiltIn: true,
        cardText: 'When this sub is played into a zone, spawn two additional copies into that same zone.',
        materialCost: 150000,
        blueprintCost: 56000,
        cpCost: 0,
        imageUrl: 'pontus.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.SUB,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [KEYWORDS.FRAGILE],
        meta: {
            additionalSpawns: 2
        }
    },
    {
        name: 'Basher',
        isBuiltIn: true,
        cardText: 'When this is destroyed, draw a card',
        materialCost: 210000,
        blueprintCost: 214000,
        cpCost: 0,
        imageUrl: 'basher.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [],
        meta: {
        }
    },
    {
        name: 'Judgement',
        isBuiltIn: true,
        cardText: 'While your opponent has a submarine or airship, this card costs 100k less. Each turn, you may pay 1cp to have this vehicle 1v1 an enemy submarine or airship in this zone.',
        materialCost: 540000,
        blueprintCost: 546000,
        cpCost: 0,
        imageUrl: 'judgement.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [],
        meta: {
        },
    },
];

const wfUpdated = [
    {
        name: 'Purifier',
        isBuiltIn: true,
        cardText: 'This ship can only be played into a zone in which you have lost a fleet battle the previous turn. This vehicle does no damage to the enemy base.',
        materialCost: 760000,
        blueprintCost: 765000,
        cpCost: 0,
        imageUrl: 'purifier.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [KEYWORDS.HALF_COST, KEYWORDS.FRAGILE],
        meta: {
        }
    },
];
