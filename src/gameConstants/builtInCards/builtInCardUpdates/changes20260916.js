const { KEYWORDS } = require("../../gameSettings");

// Baseline: 7f85235 "balance pass 9/2/2026". Diffed by card NAME.
// Design data only — imageUrl and meta are omitted, being vestigial here.
// Rules changes, lost text and open questions are collected here, not per card.
//
// WORDING, NOT RULES
// - Obelisk's text gained a full stop. No other change to its wording.
//
// RULES CHANGES
// - "AI ship" replaces "SS ship" on Victoria, Trondheim, Excalibur, Nothung,
//   Sacrilego, Resolute and Argonaut. This IS a rules change, not a rewording.
//   AI means a built-in vehicle, as opposed to a player-made design — the
//   game supports both, and AI has never meant a faction. So each of these
//   seven now tests whether the ship is built-in rather than whether it is SS,
//   which cuts both ways: a built-in ship of ANY faction now qualifies, and a
//   player-made SS ship no longer does.
//   The point of the change is the first half. These cards were dead weight
//   once DWG stole them, because a stolen SS card sits in a hand with no SS
//   ships in it; keyed on built-in, a stolen Victoria can reduce a built-in
//   DWG hull instead, and the card keeps working in the hand that took it.
//   This reverses the 2026-09-02 pass, which had moved these same seven off
//   built-in and onto the SS faction.
// - Repairmen Ready still reads "an SS vehicle" and is untouched here. The
//   phrase is per card, so it stays a faction test while the seven above go
//   back to built-in.
// - Mirth Factory targets "AI ship" where it targeted "robotic vehicle" —
//   built-in in the same sense as the SS cards, so this drops the ROBOTIC
//   requirement entirely and opens targeting to built-in ships of every
//   faction, while restricting it to ships. TG's four robotic non-ships stop
//   being legal targets; every other faction's built-in ships start being one.
// - Mirth Swarm now caps itself: no more than one may be in any single battle
//   on a side, however it got there. Mirth Factory and Obelisk both spawn
//   Swarms into battles, so the cap binds them and any stacking of the two.
// - Basher's draw moves from when it is played to when it is destroyed.
// - Slasher adds one Earth Raker to hand instead of two. Still free.
// - Flying Squirrel Attack sends two 3x squadrons against the target instead
//   of one.
// - Tyr's cost decay gains a floor: it stops at 500k.
// - Albacore's zone lock narrows from "any other aircraft" to "another
//   Albacore" — the player may now stack other aircraft alongside it.
//
// TEXT LOST, WITH NOTHING REPLACING IT
// - Fear loses "spawn a friendly horror into each zone" and now reads "When
//   this vehicle is played, draw a card". Horror is deleted in this same pass
//   and Fear was the only card naming it, so nothing is left stranded — but
//   Fear stops being a board-filler and becomes a 500k draw-one.
// - Spectre loses "When played, reduce your opponents cp by 1 (min 0)". The cp
//   drain is gone; Spectre now does nothing on play.
// - Sacrilego loses "Whenever this vehicle participates in a fleet battle,
//   friendly ships receive SCRAPPY keyword for that battle", and loses MOBILE.
//   It keeps its own SCRAPPY and STEALTHY; what is gone is granting SCRAPPY to
//   the rest of the fleet. Its surviving clause (reduce AI ship costs by 30k
//   on surviving a battle) is unchanged.
// - Scourge loses "When played, gain 1cp" and gains BLOCKER.
// - Disemboweler loses "When played, gain 1 cp." and gains STEALTHY.
// - Tarpon loses "While this vehicle is alive, you may not play any other
//   aircraft into this zone", loses FRAGILE and SUB_SCREEN, and gains
//   AIR_SCREEN. AIR_SCREEN does NOT cover the lost clause — it is the opposite
//   side of it. The old text restricted Tarpon's own controller; AIR_SCREEN
//   restricts the enemy. Tarpon now has no self-restriction at all.
// - Obelisk loses STEALTHY, so it can no longer opt out of defensive battles.
// - Sinners Luck loses SCRAPPY and gains an on-play clause (see below).
//
// TEXT LOST THAT CHANGES NOTHING
// - Spawn Buccaneer loses "It is not temporary." Buccaneer has never printed
//   TEMPORARY, so the clause was covering a keyword the spawned card did not
//   have. (Contrast Spawn Audacious, which keeps the same sentence because
//   Audacious does print TEMPORARY.)
//
// RULES INTERACTIONS WORTH A LOOK
// - Brigand prints SCRAPPY alongside its on-destroy clause. Ruled intended:
//   this is not a conflict and SCRAPPY stays. Argonaut carries the same
//   pairing.
// - Buccaneer now prints SCRAPPY natively, which makes Spawn Buccaneer's "It
//   gains the Scrappy keyword" redundant. Harmless, but the sentence no longer
//   does anything.
//
// NEW CARD
// - Mutiny (DWG ability, 400k): takes control of an enemy vehicle and makes it
//   TEMPORARY, so it leaves play at end of turn — a one-turn theft, not a
//   permanent one. Brigand is its only other source: Brigand's death clause
//   draws a copy of Mutiny.

const dwgNew = [
    {
        name: 'Mutiny',
        isBuiltIn: true,
        cardText: 'Choose an enemy vehicle, gain control of it and give it temporary',
        materialCost: 400000,
        blueprintCost: 0,
        cpCost: 0,
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
    },
];

const dwgUpdated = [
    {
        name: 'Brigand',
        isBuiltIn: true,
        cardText: 'When this is destroyed, draw a copy of Mutiny',
        materialCost: 350000,
        blueprintCost: 356000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
    },
    {
        name: 'Buccaneer',
        isBuiltIn: true,
        cardText: '',
        materialCost: 220000,
        blueprintCost: 296000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
    },
    {
        name: 'Spawn Buccaneer',
        isBuiltIn: true,
        cardText: 'Spawn a Buccaneer into a zone. It gains the Scrappy keyword.',
        materialCost: 225000,
        blueprintCost: 0,
        cpCost: 0,
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
    },
    {
        name: 'Sinners Luck',
        isBuiltIn: true,
        cardText: 'when played, you may swap a friendly airship with an enemy airship or plane. If airship you provide is worth less than what you get, the opponent draws a card and reduces that cards cost by the difference.',
        materialCost: 250000,
        blueprintCost: 267000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [],
    },
    {
        name: 'Tarpon',
        isBuiltIn: true,
        cardText: '',
        materialCost: 510000,
        blueprintCost: 511605,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.AIR_SCREEN],
    },
    {
        name: 'Albacore',
        isBuiltIn: true,
        cardText: 'While this vehicle is alive, you may not play another Albacore into this zone',
        materialCost: 260000,
        blueprintCost: 261000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.FRAGILE],
    },
    {
        name: 'Loggerhead',
        isBuiltIn: true,
        cardText: 'When this vehicle is destroyed, shuffle another copt of it into your deck. It costs 0.',
        materialCost: 70000,
        blueprintCost: 74000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.HALF_COST],
    },
    {
        name: 'Pilferer',
        isBuiltIn: true,
        cardText: 'When played, spawn another copy of this vehicle into the zone',
        materialCost: 100000,
        blueprintCost: 132000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.DWG,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
    },
    {
        name: 'Flying Squirrel Attack',
        isBuiltIn: true,
        cardText: 'Choose an enemy vehicle, that vehicle fights alone against two flying squirrel (3x squadron)',
        materialCost: 100000,
        blueprintCost: 0,
        cpCost: 0,
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.DWG,
        blueprintId: null,
    },
];

const ssUpdated = [
    {
        name: 'Victoria',
        isBuiltIn: true,
        cardText: 'When played, pick one AI ship in hand and reduce its cost by 75k',
        materialCost: 250000,
        blueprintCost: 270185,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [],
    },
    {
        name: 'Trondheim',
        isBuiltIn: true,
        cardText: 'When this vehicle is destroyed, draw an AI ship and reduce its cost by 75k',
        materialCost: 375000,
        blueprintCost: 393000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER],
    },
    {
        name: 'Excalibur',
        isBuiltIn: true,
        cardText: 'Pick one AI ship in hand and reduce its cost by 200k',
        materialCost: 550000,
        blueprintCost: 553900,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER],
    },
    {
        name: 'Nothung',
        isBuiltIn: true,
        cardText: 'When played, reduce the cost of all AI ships in your hand by 40k',
        materialCost: 400000,
        blueprintCost: 478000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER],
    },
    {
        name: 'Resolute',
        isBuiltIn: true,
        cardText: 'When this vehicle is played, draw an AI ship from your deck. reduce its cost by 40k',
        materialCost: 60000,
        blueprintCost: 63300,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [],
    },
    {
        name: 'Argonaut',
        isBuiltIn: true,
        cardText: 'When this is destroyed, reduce the cost of a random AI ship in your hand by 50k',
        materialCost: 90000,
        blueprintCost: 94000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY],
    },
    {
        name: 'Sacrilego',
        isBuiltIn: true,
        cardText: 'Whenever this vehicle survives a fleet battle, reduce the cost of AI ships in hand by 30k.',
        materialCost: 10000,
        blueprintCost: 86000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY, KEYWORDS.STEALTHY],
    },
    {
        name: 'Tyr',
        isBuiltIn: true,
        cardText: 'This card costs 60k less for every turn it spends in your hand. Min 500k',
        materialCost: 950000,
        blueprintCost: 983000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.FRAGILE],
    },
    {
        name: 'Spectre',
        isBuiltIn: true,
        cardText: '',
        materialCost: 200000,
        blueprintCost: 214000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.SS,
        blueprintId: null,
        keywords: [KEYWORDS.STEALTHY],
    },
    {
        name: 'Blockade',
        isBuiltIn: true,
        cardText: 'Choose a zone, whenever the opponent plays a vehicle into that zone while you have at least one vehicle there, a fleet battle immediately begins in that zone. If you lose with no surviving vehicles, the blockade goes away, otherwise it remains.',
        materialCost: 120000,
        blueprintCost: 0,
        cpCost: 0,
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.SS,
        blueprintId: null,
    },
];

const tgUpdated = [
    {
        name: 'Fear',
        isBuiltIn: true,
        cardText: 'When this vehicle is played, draw a card',
        materialCost: 500000,
        blueprintCost: 800000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.TG,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.ROBOTIC, KEYWORDS.UPKEEP_REQUIRED],
    },
    {
        name: 'Mirth Swarm',
        isBuiltIn: true,
        cardText: 'No more than one mirth swarm can participate in any one battle on a single side, even if spawned in by card effect',
        materialCost: 200000,
        blueprintCost: 200000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.PLANE,
        type: 'vehicle',
        faction: FACTIONS.TG,
        blueprintId: null,
        keywords: [KEYWORDS.ROBOTIC, KEYWORDS.TEMPORARY, KEYWORDS.HALF_COST],
    },
    {
        name: 'Mirth Factory',
        isBuiltIn: true,
        cardText: 'Target friendly AI ship. Whenever that vehicle is engaged in a fleet combat, spawn a Mirth swarm to fight along side it',
        materialCost: 60000,
        blueprintCost: 0,
        cpCost: 0,
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.TG,
        blueprintId: null,
    },
    {
        name: 'Obelisk',
        isBuiltIn: true,
        cardText: 'Whenever this vehicle participates in a fleet battle, spawn a temporary Mirth swarm to fight on your side in the battlefield.',
        materialCost: 60000,
        blueprintCost: 32000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.TG,
        blueprintId: null,
        keywords: [],
    },
    {
        name: 'Audacious',
        isBuiltIn: true,
        cardText: '',
        materialCost: 660000,
        blueprintCost: 665000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.PLANE,
        type: 'vehicle',
        faction: FACTIONS.TG,
        blueprintId: null,
        keywords: [KEYWORDS.HALF_COST, KEYWORDS.TEMPORARY, KEYWORDS.FRAGILE],
    },
    {
        name: 'Spawn Audacious',
        isBuiltIn: true,
        cardText: 'Spawn an audacious into target zone. It is not temporary.',
        materialCost: 400000,
        blueprintCost: 0,
        cpCost: 0,
        playerId: null,
        vehicleType: null,
        type: 'ability',
        faction: FACTIONS.TG,
        blueprintId: null,
    },
];

const tgDeleted = [
    {
        name: 'Horror',
        isBuiltIn: true,
        cardText: 'Whenever a horror participates in an offensive fleet battle, create anther copy of it in this zone. Max one spawn per zone',
        materialCost: 50000,
        blueprintCost: 77000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.TG,
        blueprintId: null,
        keywords: [KEYWORDS.ROBOTIC],
    },
];

const owUpdated = [
    {
        name: 'Bulwark',
        isBuiltIn: true,
        cardText: '',
        materialCost: 600000,
        blueprintCost: 848000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER],
    },
    {
        name: 'Eyrie',
        isBuiltIn: true,
        cardText: '',
        materialCost: 650000,
        blueprintCost: 809000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.AIRSHIP,
        type: 'vehicle',
        faction: FACTIONS.OW,
        blueprintId: null,
        keywords: [KEYWORDS.BLOCKER, KEYWORDS.FRAGILE],
    },
];

const wfUpdated = [
    {
        name: 'Scourge',
        isBuiltIn: true,
        cardText: '',
        materialCost: 225000,
        blueprintCost: 209000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [KEYWORDS.SCRAPPY, KEYWORDS.BLOCKER],
    },
    {
        name: 'Disemboweler',
        isBuiltIn: true,
        cardText: '',
        materialCost: 300000,
        blueprintCost: 305000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SUB,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [KEYWORDS.STEALTHY],
    },
    {
        name: 'Slasher',
        isBuiltIn: true,
        cardText: 'When this is played, add an earth raker to your hand. it costs 0.',
        materialCost: 300000,
        blueprintCost: 353000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [],
    },
    {
        name: 'Basher',
        isBuiltIn: true,
        cardText: 'When this vehicle is destroyed, draw a card',
        materialCost: 210000,
        blueprintCost: 214000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [],
    },
    {
        name: 'Purifier',
        isBuiltIn: true,
        cardText: 'This vehicle does no damage to the enemy base. Whenever it participates in a fleet battle, the enemy forces must spawn in first, even if they are defending.',
        materialCost: 760000,
        blueprintCost: 765000,
        cpCost: 0,
        playerId: null,
        vehicleType: VEHICLE_TYPES.SHIP,
        type: 'vehicle',
        faction: FACTIONS.WF,
        blueprintId: null,
        keywords: [KEYWORDS.HALF_COST, KEYWORDS.FRAGILE],
    },
];

