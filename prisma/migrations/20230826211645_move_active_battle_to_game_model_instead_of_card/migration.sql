/*
  Warnings:

  - You are about to drop the column `activeBattle` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "activeBattle";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "activeBattle" JSONB;
