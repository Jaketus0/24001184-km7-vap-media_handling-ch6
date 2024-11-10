/*
  Warnings:

  - You are about to drop the column `imageFieldId` on the `image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageFileId]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageFileId` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "image_imageFieldId_key";

-- AlterTable
ALTER TABLE "image" DROP COLUMN "imageFieldId",
ADD COLUMN     "imageFileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "image_imageFileId_key" ON "image"("imageFileId");
