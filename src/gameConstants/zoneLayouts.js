import { v4 as uuid } from 'uuid'; 
import { ZONE_TYPES } from './gameSettings';

export const standardZoneLayout = [
  {
      type: ZONE_TYPES.WATER,
      attackingPlayerCards: [],
      defendingPlayerCards: [],
      attackingPlayerHp: 1000,
      defendingPlayerHp: 1000,
      id: uuid(),
    },
    {
      type: ZONE_TYPES.WATER,
      attackingPlayerCards: [],
      defendingPlayerCards: [],
      attackingPlayerHp: 1000,
      defendingPlayerHp: 1000,
      id: uuid(),
    },
    {
      type: ZONE_TYPES.WATER,
      attackingPlayerCards: [],
      defendingPlayerCards: [],
      attackingPlayerHp: 1000,
      defendingPlayerHp: 1000,
      id: uuid(),
    }
];