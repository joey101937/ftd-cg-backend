///
///  this is general schema that im going to try to stick to
///
///
///

const vision = [
     //player
     {
        username: 'aksdjbad',
        password: 'hash',
        decks: [/** array of deck ids */],
        customCards: [ /** array of card ids */],
        meta: 'json of misc info',
      },

      // deck
      {
        name: 'name',
        faction: 'DWG',
        cards: {
          // generate uuid "instance ids" upon game start
          /**
           * map with keys being card id and value being number of copies
           */
        },
      },

      // card
      {
          name: 'name',
          isBuiltIn: true, // true = base game card, false = custom card
          playerId: '123', // if its a custom card, what is the player's id
          deleted: false, // deleted cards retained so that games use cards as they were when game started
          blueprint: 'stringified json of blueprint',
          imageUrl: 'imageUrl',
          blueprintCost: 50000, // how much bp actually costs
          materialCost: 50000, // how much card costs to play
          cpCost: 0, // how much cp card costs to play
          type: 'vehicle', // alternatively ability
          vehicleType: 'ship', // as opposed to flier, sub
          cardText: 'ability text here if applicable',
          isBlocker: false,
          isScrappy: false,
          isAirScreen: false,
          isSubScreen: false,
          isTemporary: false,
      },
]