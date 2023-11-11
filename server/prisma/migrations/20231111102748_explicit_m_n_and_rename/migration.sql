/*
  Warnings:

  - You are about to drop the column `title` on the `Stack` table. All the data in the column will be lost.
  - You are about to drop the `_BookToStack` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `publisher` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ISBN` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `OLID` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Stack` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookToStack" DROP CONSTRAINT "_BookToStack_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToStack" DROP CONSTRAINT "_BookToStack_B_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "hasImg" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "publisher" SET NOT NULL,
ALTER COLUMN "publisher" SET DEFAULT '',
ALTER COLUMN "ISBN" SET NOT NULL,
ALTER COLUMN "ISBN" SET DEFAULT '',
ALTER COLUMN "OLID" SET NOT NULL,
ALTER COLUMN "OLID" SET DEFAULT '',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Stack" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "_BookToStack";

-- CreateTable
CREATE TABLE "BookStackJunction" (
    "bookId" INTEGER NOT NULL,
    "stackId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookStackJunction_pkey" PRIMARY KEY ("bookId","stackId")
);

-- AddForeignKey
ALTER TABLE "BookStackJunction" ADD CONSTRAINT "BookStackJunction_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookStackJunction" ADD CONSTRAINT "BookStackJunction_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "Stack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
