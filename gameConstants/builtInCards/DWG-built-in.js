import { FACTIONS, KEYWORDS, TRIGGERS, VEHICLE_TYPES } from "../gameSettings";

export const dwgVehicles = [
    {
        name: 'Marauder',
        isBuiltIn: true,
        cardText: 'When this vehicle is played, draw a card and gain a 1cp.',
        materialCost: 20000,
        blueprintCost: 40205,
        cpCost: 0,
        imageUrl: 'marauder.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_PLAY]: 'marauderOnPlay'
        }
    }, 
    {
        name: 'Crossbones',
        isBuiltIn: true,
        cardText: 'When this vehicle is played, draw a card and gain 1cp.',
        materialCost: 440000,
        blueprintCost: 449631,
        cpCost: 0,
        imageUrl: 'crossbones.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.SCRAPPY],
        meta: {
            [TRIGGERS.ON_PLAY]: 'crossbonesOnPlay',
        }
    },
    {
        name: 'Ransack',
        isBuiltIn: true,
        cardText: 'When this vehicle is played, draw a card and gain 1cp.',
        materialCost: 150000,
        blueprintCost: 159597,
        cpCost: 0,
        imageUrl: 'ransack.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
        meta: {
        }
    },{
        name: 'Plunderer',
        isBuiltIn: true,
        cardText: 'Costs 20k less for each friendly vehicle in play',
        materialCost: 180000,
        blueprintCost: 187000,
        cpCost: 0,
        imageUrl: 'plunderer.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.SCRAPPY],
        meta: {
            costModifier: 'plundererCostModifier',
        }
    },{
        name: 'Tarpon',
        isBuiltIn: true,
        cardText: '',
        materialCost: 510000,
        blueprintCost: 511605,
        cpCost: 0,
        imageUrl: 'ransack.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.SUB_SCREEN, KEYWORDS.AIR_SCREEN],
        meta: {
        }
    },{
        name: 'Corsair',
        isBuiltIn: true,
        cardText: 'Whenever this card is played, add two additional copies into the zone',
        materialCost: 30000,
        blueprintCost: 31000,
        cpCost: 0,
        imageUrl: 'corsair.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.SCRAPPY],
        meta: {
            additionalSpawns: 2,
        }
    },{
        name: 'Land Marauder',
        isBuiltIn: true,
        cardText: '',
        materialCost: 70000,
        blueprintCost: 74000,
        cpCost: 0,
        imageUrl: 'landMarauder.png',
        playerId: null,
        vehicleType: 'tank',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY, KEYWORDS.AIR_SCREEN],
        meta: {
            additionalSpawns: 1,
        }
    },{
        name: 'Loggerhead',
        isBuiltIn: true,
        cardText: 'When this vehicle is destroyed, shuffle another copt of it into your deck. It costs 0.',
        materialCost: 70000,
        blueprintCost: 74000,
        cpCost: 0,
        imageUrl: 'loggerhead.png',
        playerId: null,
        vehicleType: 'airship',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY, KEYWORDS.HALF_COST],
        meta: {
            [TRIGGERS.ON_DEATH]: 'loggerheadOnDeath',
        }
    },{
        name: 'Reserves',
        isBuiltIn: true,
        cardText: 'Generate three random DWG vehicle cards and put them into your hand',
        materialCost: 0,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'Reserves.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_PLAY]: 'reservesEffect',
        }
    },{
        name: 'Buccaneer',
        isBuiltIn: true,
        cardText: '',
        materialCost: 250000,
        blueprintCost: 250000,
        cpCost: 0,
        imageUrl: 'buccaneer.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.HALF_COST],
        meta: {
        }
    },{
        name: 'Spawn Buccaneer',
        isBuiltIn: true,
        cardText: 'Spawn a Buccaneer into a zone. It is not temporary. It gains the Scrappy keyword.',
        materialCost: 150000,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'spawnBuccaneer.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_ZONE]: 'spawnBuccaneerEffect',
        }
    },{
        name: 'Double Up',
        isBuiltIn: true,
        cardText: 'Target DWG vehicle card in hand That costs less than 400k. spawns an additional copy of that vehicle when played',
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
    },{
        name: 'DWG Waters',
        isBuiltIn: true,
        cardText: ' Choose a zone. For the rest of the game, whenever you fight a defensive battle in that zone, you may choose one DWG vehicle with a cost <60k from the game to fight alongside your fleet in that battle. If the enemy attacks you directly in this zone, you can force them to beat this ship in battle first before doing damage with their surviving vehicles',
        materialCost: 50000,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'dwgWaters.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_ZONE]: 'dwgWatersEffect',
        }
    },{
        name: 'Gang Up',
        isBuiltIn: true,
        cardText: 'Choose an enemy vehicle. Start a battle with that vehicle vs all your vehicles from the same zone.',
        materialCost: 0,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'gangUp.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_VEHICLE]: 'gangUpEffect',
        }
    },{
        name: 'Ongoing Attrition',
        isBuiltIn: true,
        cardText: 'Choose a zone. For the rest of the turn, if that zone is activated, and you are attacking with more vehicles than your opponent, deal 40k damage to the enemy base in that zone for each vehicle you have in the zone more than your opponent. If this card leaves play without dealing damage, draw a card.',
        materialCost: 40000,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'ongoingAttrition.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_ZONE]: 'ongoingAttritionEffect',
        }
    },{
        name: 'Abactor',
        isBuiltIn: true,
        cardText: 'Whenever this card is played, add an additional copy into the zone',
        materialCost: 150000,
        blueprintCost: 156600,
        cpCost: 0,
        imageUrl: 'abactor.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            additionalSpawns: 1
        }
    },{
        name: 'Albacore',
        isBuiltIn: true,
        cardText: '',
        materialCost: 240000,
        blueprintCost: 249522,
        cpCost: 0,
        imageUrl: 'albacore.png',
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.HALF_COST],
        meta: {
        }
    },{
        name: 'Recurring Threat',
        isBuiltIn: true,
        cardText: 'Choose a friendly vehicle, destroy it. For the rest of the game, whenever you would fight a defensive fleet battle in the zone it was in, you may summon a copy of that vehicle to fight alongside your fleet in battle.',
        materialCost: 100000,
        blueprintCost: 0,
        cpCost: 0,
        imageUrl: 'recurringThreat.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_VEHICLE]: 'recurringThreatEffect',
        }
    }
];