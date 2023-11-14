import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const User = prisma.user
const Book = prisma.book
const Stack = prisma.stack
const Note = prisma.note

export {User, Book, Stack, Note}