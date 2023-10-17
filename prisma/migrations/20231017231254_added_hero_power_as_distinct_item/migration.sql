/*
  Warnings:

  - You are about to drop the column `activeBattle` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "activeBattle",
ADD COLUMN     "pendingChange" JSONB;

-- CreateTable
CREATE TABLE "heropower" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "faction" TEXT NOT NULL DEFAULT 'NEUTRAL',
    "text" TEXT NOT NULL,
    "cpCost" INTEGER NOT NULL DEFAULT 1,
    "materialCost" INTEGER NOT NULL DEFAULT 0,
    "meta" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "heropower_pkey" PRIMARY KEY ("id")
);
