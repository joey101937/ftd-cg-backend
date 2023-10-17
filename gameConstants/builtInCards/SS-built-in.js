import { FACTIONS, TRIGGERS, KEYWORDS } from "../gameSettings";

export const ssVehicles = [
    {
        name: 'Iron Maiden',
        isBuiltIn: true,
        cardText: '',
        materialCost: 170000,
        blueprintCost: 174000,
        cpCost: 0,
        imageUrl: 'ironMaiden.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER],
        meta: {
        }
    },{
        name: 'Victoria',
        isBuiltIn: true,
        cardText: '',
        materialCost: 270000,
        blueprintCost: 270185,
        cpCost: 0,
        imageUrl: 'victoria.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
        meta: {
        }
    },{
        name: 'Resolute',
        isBuiltIn: true,
        cardText: '',
        materialCost: 60000,
        blueprintCost: 63000,
        cpCost: 0,
        imageUrl: 'resolute.png',
        playerId: null,
        vehicleType: 'ship',
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
        meta: {
        }
    },{
        name: 'Aurora Strafe',
        isBuiltIn: true,
        cardText: '',
        materialCost: 0,
        blueprintCost: 0,
        cpCost: 1,
        imageUrl: 'auroraStrafe.png',
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.SS,
        blueprintId: null,
        meta: {
            [TRIGGERS.PLAY_ON_ZONE]: 'auroraStrafeEffect'
        }
    },{
        name: 'Repairmen Ready',
        isBuiltIn: true,
        cardText: '',
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
    },{
        name: 'Excalibur',
        isBuiltIn: true,
        cardText: '',
        materialCost: 550000,
        blueprintCost: 553900,
        cpCost: 0,
        imageUrl: 'excalibur.png',
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