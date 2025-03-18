-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('diary', 'poem', 'tech', 'question', 'review');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'poem';
