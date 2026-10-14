/*
  Warnings:

  - A unique constraint covering the columns `[id,deck_id]` on the table `Subsection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_chapter_id_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_subsection_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Subsection_id_deck_id_key" ON "Subsection"("id", "deck_id");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_chapter_id_deck_id_fkey" FOREIGN KEY ("chapter_id", "deck_id") REFERENCES "Chapter"("id", "deck_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_subsection_id_deck_id_fkey" FOREIGN KEY ("subsection_id", "deck_id") REFERENCES "Subsection"("id", "deck_id") ON DELETE RESTRICT ON UPDATE CASCADE;
