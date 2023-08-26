/*
  Warnings:

  - You are about to drop the column `staus` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "staus",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';
