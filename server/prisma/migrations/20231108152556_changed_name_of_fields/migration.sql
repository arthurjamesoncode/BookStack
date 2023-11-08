/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BooksInStacks" DROP CONSTRAINT "BooksInStacks_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BooksInStacks" DROP CONSTRAINT "BooksInStacks_stackId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "passwordHash" CHAR(60) NOT NULL;

-- AddForeignKey
ALTER TABLE "BooksInStacks" ADD CONSTRAINT "BooksInStacks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksInStacks" ADD CONSTRAINT "BooksInStacks_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "Stack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
