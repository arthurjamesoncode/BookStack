import { Book } from '@prisma/client';
import { newBook } from '../types';
import prisma from './index';

export async function getAllBooks() {
  const books = await prisma.book.findMany();

  return books;
}

export async function getBookById(
  id: number,
  includeStackId: boolean = false,
  includeStackType: boolean = false
) {
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      stacks: {
        select: {
          stack: { select: { type: includeStackType } },
          stackId: includeStackId,
        },
      },
    },
  });

  return book;
}

export async function createAndConnectToStacks(
  bookData: newBook,
  stackIds: { stackId: number }[]
) {
  const newBook = await prisma.book.create({
    data: { ...bookData, stacks: { create: stackIds } },
  });

  return newBook;
}

export async function getBooksInStack(stackId: number) {
  const books = await prisma.book.findMany({
    where: {
      stacks: {
        some: {
          stackId,
        },
      },
    },
  });

  return books;
}

export async function getBooksByUser(userId: number) {
  const books = await prisma.book.findMany({ where: { userId } });

  return books;
}

export async function updateById(id: number, data: Partial<Book>) {
  const book = prisma.book.update({ where: { id }, data });

  return book;
}

export async function deleteById(id: number) {
  const deletedBook = await prisma.book.delete({ where: { id } });

  return deletedBook;
}

export async function deleteFromStack(bookId: number, stackId: number) {
  const updatedBook = prisma.book.update({
    where: { id: bookId },
    data: {
      stacks: {
        delete: {
          bookId_stackId: {
            bookId,
            stackId,
          },
        },
      },
    },
  });

  return updatedBook;
}

export async function addBookToStack(bookId: number, stackId: number) {
  const updatedBook = await prisma.book.update({
    where: { id: bookId },
    data: { stacks: { create: { stackId } } },
  });

  return updatedBook;
}

export async function switchStacks(bookId: number, fromStackId : number, toStackId: number, toStackType : string) {
  const updatedBook = await prisma.book.update({
    where: { id: bookId },
    data: {
      primaryStack: toStackType,
      stacks: {
        delete: {
          bookId_stackId: {
            bookId,
            stackId: fromStackId,
          },
        },
        create: { stackId: toStackId },
      },
    },
  });
}