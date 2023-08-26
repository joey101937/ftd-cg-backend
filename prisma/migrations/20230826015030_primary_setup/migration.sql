-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "staus" TEXT NOT NULL DEFAULT 'active',
    "attackingPlayerId" TEXT NOT NULL,
    "defendingPlayerId" TEXT NOT NULL,
    "winningPlayerId" TEXT,
    "losingPlayerId" TEXT,
    "attackingPlayerUsername" TEXT NOT NULL,
    "defendingPlayerUsername" TEXT NOT NULL,
    "attackingPlayerDeckInstance" JSONB NOT NULL DEFAULT '[]',
    "defendingPlayerDeckInstance" JSONB NOT NULL DEFAULT '[]',
    "attackingPlayerHand" JSONB NOT NULL DEFAULT '[]',
    "defendingPlayerHand" JSONB NOT NULL DEFAULT '[]',
    "attackingPlayerCp" INTEGER NOT NULL DEFAULT 0,
    "defendingPlayerCp" INTEGER NOT NULL DEFAULT 0,
    "attackingPlayerAvailableHeroPowers" JSONB NOT NULL DEFAULT '[]',
    "defendingPlayerAvailableHeroPowers" JSONB NOT NULL DEFAULT '[]',
    "isAttackingPlayersTurn" BOOLEAN NOT NULL DEFAULT true,
    "zones" JSONB NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isBuiltIn" BOOLEAN NOT NULL DEFAULT false,
    "playerId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "blueprint" TEXT,
    "blueprintCost" INTEGER NOT NULL,
    "materialCost" INTEGER NOT NULL,
    "cpCost" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "vehicleType" TEXT,
    "cardText" TEXT NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_attackingPlayerId_fkey" FOREIGN KEY ("attackingPlayerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_defendingPlayerId_fkey" FOREIGN KEY ("defendingPlayerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
