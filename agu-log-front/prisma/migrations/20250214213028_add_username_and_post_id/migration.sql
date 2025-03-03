/*
  Warnings:

  - A unique constraint covering the columns `[post_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[author_id,post_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "post_id" VARCHAR(16);

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "username" VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_id_key" ON "posts"("post_id");

-- CreateIndex
CREATE INDEX "posts_post_id_idx" ON "posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_author_id_post_id_key" ON "posts"("author_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");

-- CreateIndex
CREATE INDEX "profiles_username_idx" ON "profiles"("username");
