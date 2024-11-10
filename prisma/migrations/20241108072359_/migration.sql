/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "image" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "image_title_key" ON "image"("title");
