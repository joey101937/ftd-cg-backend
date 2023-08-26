import { v4 as uuid } from 'uuid'; 

export const standardZoneLayout = [
  {
      type: 'water',
      attackingPlayerCards: [],
      defendingPlayerCards: [],
      attackingPlayerHp: 500,
      defendingPlayerHp: 500,
      attackingPlayerActiveEffects: [],
      defendingPlayerActiveEffects: [],
      id: uuid(),
    },
    {
      type: 'beach',
      attackingPlayerCards: [],
      defendingPlayerCards: [],
      attackingPlayerHp: 500,
      defendingPlayerHp: 500,
      attackingPlayerActiveEffects: [],
      defendingPlayerActiveEffects: [],
      id: uuid(),
    },
    {
      type: 'land',
      attackingPlayerCards: [],
      defendingPlayerCards: [],
      attackingPlayerHp: 500,
      defendingPlayerHp: 500,
      attackingPlayerActiveEffects: [],
      defendingPlayerActiveEffects: [],
      id: uuid(),
    }
];