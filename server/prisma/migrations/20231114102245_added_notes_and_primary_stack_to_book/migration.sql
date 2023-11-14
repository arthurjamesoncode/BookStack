/*
  Warnings:

  - A unique constraint covering the columns `[userId,primaryStack]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `primaryStack` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "primaryStack" VARCHAR(8) NOT NULL,
ALTER COLUMN "currentPage" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Note" (
    "id" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "page" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_userId_primaryStack_key" ON "Book"("userId", "primaryStack");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
