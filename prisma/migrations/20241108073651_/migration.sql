/*
  Warnings:

  - Made the column `title` on table `image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "image" ALTER COLUMN "title" SET NOT NULL;
