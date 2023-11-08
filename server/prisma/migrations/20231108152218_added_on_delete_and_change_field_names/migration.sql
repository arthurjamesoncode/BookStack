-- DropForeignKey
ALTER TABLE "Stack" DROP CONSTRAINT "Stack_userId_fkey";

-- AddForeignKey
ALTER TABLE "Stack" ADD CONSTRAINT "Stack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
