/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tag_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "type" SET DEFAULT 'diary';

-- CreateIndex
CREATE UNIQUE INDEX "tag_categories_name_key" ON "tag_categories"("name");
