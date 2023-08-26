/*
  Warnings:

  - You are about to drop the column `blueprint` on the `blueprint` table. All the data in the column will be lost.
  - Added the required column `blueprintRaw` to the `blueprint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blueprint" DROP COLUMN "blueprint",
ADD COLUMN     "blueprintRaw" JSONB NOT NULL,
ALTER COLUMN "blueprintCost" SET DEFAULT 0;
