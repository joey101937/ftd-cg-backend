import { FACTIONS, VEHICLE_KEYWORDS, TRIGGERS } from "../gameSettings";

export const dwgVehicles = [
    {
        name: 'Marauder',
        isBuiltIn: true,
        cardText: 'When this vehicle is played, draw a card.',
        materialCost: 42000,
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
        meta: {
            [TRIGGERS.ON_PLAY]: 'crossbonesOnPlay',
            keywords: [VEHICLE_KEYWORDS.BLOCKER, VEHICLE_KEYWORDS.SCRAPPY],
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
        meta: {
            keywords: [VEHICLE_KEYWORDS.SCRAPPY],
        }
    },{
        name: 'Plunderer',
        isBuiltIn: true,
        cardText: 'Costs 20k less for each friendly dwg vehicle in play',
        materialCost: 180000,
        blueprintCost: 187000,
        cpCost: 0,
        imageUrl: 'plunderer.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            costModifier: 'plundererCostModifier',
            keywords: [VEHICLE_KEYWORDS.BLOCKER, VEHICLE_KEYWORDS.SCRAPPY],
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
        vehicleType: 'flier',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            keywords: [VEHICLE_KEYWORDS.HALF_COST, VEHICLE_KEYWORDS.TEMPORARY, VEHICLE_KEYWORDS.SUB_SCREEN, VEHICLE_KEYWORDS.AIR_SCREEN],
        }
    },{
        name: 'Corsair',
        isBuiltIn: true,
        cardText: 'Whenever this card is played, add an additional copy into the zone',
        materialCost: 30000,
        blueprintCost: 31000,
        cpCost: 0,
        imageUrl: 'corsair.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            additionalSpawns: 1,
            keywords: [VEHICLE_KEYWORDS.BLOCKER, VEHICLE_KEYWORDS.SCRAPPY],
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
        meta: {
            additionalSpawns: 1,
            keywords: [VEHICLE_KEYWORDS.SCRAPPY, VEHICLE_KEYWORDS.AIR_SCREEN],
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
        vehicleType: 'flier',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            [TRIGGERS.ON_DEATH]: 'loggerheadOnDeath',
            keywords: [VEHICLE_KEYWORDS.SCRAPPY, VEHICLE_KEYWORDS.HALF_COST, VEHICLE_KEYWORDS.TEMPORARY],
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
        materialCost: 230000,
        blueprintCost: 230639,
        cpCost: 0,
        imageUrl: 'buccaneer.png',
        playerId: null,
        vehicleType: 'flier',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            keywords: [VEHICLE_KEYWORDS.HALF_COST, VEHICLE_KEYWORDS.TEMPORARY],
        }
    },{
        name: 'Spawn Buccaneer',
        isBuiltIn: true,
        cardText: 'Spawn a Buccaneer into a zone. It is not temporary. It gains the Scrappy keyword.',
        materialCost: 100000,
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
        cardText: 'Target DWG vehicle card in hand spawns an additional copy of that vehicle when played',
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
        cardText: ' Choose a zone. For the rest of the game, whenever you fight a defensive battle in that zone, you may choose one DWG vehicle with a cost <50k from the game to fight alongside your fleet in that battle.',
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
        cardText: 'Choose a zone. For the rest of the game, whenever that zone is activated, if you are attacking with more vehicles than your opponent, deal 50k damage to the enemy base in that zone for each vehicle you have in the zone more than your opponent.',
        materialCost: 0,
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
        cardText: '',
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
            keywords: [],
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
        vehicleType: 'flier',
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        meta: {
            keywords: [keywords.HALF_COST, keywords.TEMPORARY],
        }
    }
];