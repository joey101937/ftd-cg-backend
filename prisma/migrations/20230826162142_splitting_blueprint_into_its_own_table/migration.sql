/*
  Warnings:

  - You are about to drop the column `blueprint` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "blueprint",
ADD COLUMN     "blueprintId" TEXT;

-- CreateTable
CREATE TABLE "blueprint" (
    "id" TEXT NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}',
    "blueprintCost" INTEGER NOT NULL,
    "name" TEXT,
    "blueprint" TEXT,

    CONSTRAINT "blueprint_pkey" PRIMARY KEY ("id")
);
