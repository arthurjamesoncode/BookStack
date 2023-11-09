-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "passwordHash" CHAR(60) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "totalPages" INTEGER NOT NULL,
    "currentPage" INTEGER NOT NULL DEFAULT 1,
    "bookType" VARCHAR(10) NOT NULL DEFAULT 'paper',
    "publisher" VARCHAR(255),
    "ISBN" VARCHAR(13),
    "OLID" VARCHAR(15),
    "description" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stack" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" VARCHAR(8) NOT NULL,

    CONSTRAINT "Stack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToStack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToStack_AB_unique" ON "_BookToStack"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToStack_B_index" ON "_BookToStack"("B");

-- AddForeignKey
ALTER TABLE "Stack" ADD CONSTRAINT "Stack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToStack" ADD CONSTRAINT "_BookToStack_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToStack" ADD CONSTRAINT "_BookToStack_B_fkey" FOREIGN KEY ("B") REFERENCES "Stack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
