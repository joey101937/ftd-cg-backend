-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "attackingPlayerMaterials" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "defendingPlayerMaterials" INTEGER NOT NULL DEFAULT 0;
