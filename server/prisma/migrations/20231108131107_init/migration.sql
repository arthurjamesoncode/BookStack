-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" CHAR(60) NOT NULL,

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
CREATE TABLE "BooksInStacks" (
    "bookId" INTEGER NOT NULL,
    "stackId" INTEGER NOT NULL,

    CONSTRAINT "BooksInStacks_pkey" PRIMARY KEY ("bookId","stackId")
);

-- AddForeignKey
ALTER TABLE "Stack" ADD CONSTRAINT "Stack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksInStacks" ADD CONSTRAINT "BooksInStacks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksInStacks" ADD CONSTRAINT "BooksInStacks_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
