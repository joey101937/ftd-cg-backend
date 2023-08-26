import { FACTIONS, VEHICLE_KEYWORDS } from "../gameSettings";

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
        meta: {
            keywords: [VEHICLE_KEYWORDS.BLOCKER, VEHICLE_KEYWORDS.SCRAPPY, VEHICLE_KEYWORDS.AIR_SCREEN]
        }
    },{
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
        meta: {
            playOnVehicleEffect: 'trebuchetEffect',
            keywords: [VEHICLE_KEYWORDS.SCRAPPY]
        }
    },
    {
        name: 'Sub Killer',
        isBuiltIn: true,
        cardText: 'Target an enemy submarine or flier vehicle. Remove it from play.',
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
            playOnVehicleEffect: 'subKillerEffect',
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
            playOnGameEffect: 'claymoreEffect'
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
            playOnGameEffect: 'palisadeEffect'
        }
    },{
        name: 'Defensive Palisade',
        isBuiltIn: true,
        cardText: 'Spawn a parapet into a zone. It gains Inoffensive, Scrappy, and blocker keywords. It is not Temporary.',
        materialCost: 200000,
        blueprintCost: 0,
        cpCost: 2,
        imageUrl: 'defensivePalisade.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.OW,
        blueprintId: null,
        meta: {
            playOnZoneEffect: 'defensivePalisadeEffect',
        }
    },
];