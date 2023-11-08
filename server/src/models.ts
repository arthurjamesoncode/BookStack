import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const User = prisma.user
const Book = prisma.book
const Stack = prisma.stack
const BooksInStacks = prisma.booksInStacks

export {User, Book, Stack, BooksInStacks}