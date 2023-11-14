import { Book, Stack } from '../models';
import { Request, Response } from 'express';

export async function getAllBooks(req: Request, res: Response) {
  try {
    const books = await Book.findMany();
    res.status(200).send(books);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getBookById(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);
    const book = await Book.findUnique({ where: { id: bookId } });

    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

export async function addNewBookToStack(req: Request, res: Response) {
  try {
    const [type, stackId] = [req.params.type, Number(req.params.stackId)];
    const userId = 1; //will take this from a token / session after doing auth

    const bookData = { ...req.body, userId };

    const stacks: { [key: string]: number | string }[] = [{ stackId }];

    if (type === 'other') {
      const tbr = await Stack.findFirst({ where: { userId, type: 'tbr' } });
      stacks.push({ stackId: tbr!.id });
    }

    const newBook = await Book.create({
      data: { ...bookData, stacks: { create: stacks } },
    });

    res.status(201).send(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getBooksInStack(req: Request, res: Response) {
  try {
    const stackId = Number(req.params.stackId);

    const books = await Book.findMany({
      where: {
        stacks: {
          some: {
            stackId,
          },
        },
      },
    });

    res.status(200).send(books);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function editBook(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);
    const bookData = req.body;

    const book = await Book.update({ where: { id: bookId }, data: bookData });

    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function deleteBookFromStack(req: Request, res: Response) {
  try {
    const [type, stackId, bookId] = [
      req.params.type,
      Number(req.params.stackId),
      Number(req.params.bookId),
    ];

    if (type !== 'other') {
      const deletedBook = await Book.delete({ where: { id: bookId } });

      return res.status(200).send(deletedBook);
    }

    const book = await Book.findFirst({
      where: { id: bookId },
      include: {
        stacks: {
          select: {
            stackId: true,
            addedAt: true,
          },
        },
      },
    });

    const newStacks = book!.stacks.filter((stack) => stack.stackId != stackId);

    const updatedBook = await Book.update({
      where: { id: bookId },
      data: {
        stacks: {
          set: [],
          createMany: { data: newStacks },
        },
      },
    });

    res.status(201).send(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getBooksByUser(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);

    const books = await Book.findMany({ where: { userId } });

    res.status(200).send(books);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function addExistingBookToStack(req: Request, res: Response) {
  try {
    const [type, stackId, bookId] = [
      req.params.type,
      Number(req.params.stackId),
      Number(req.params.bookId),
    ];

    if (type === 'other') {
      const response = await Book.update({
        where: { id: bookId },
        data: { stacks: { create: { stackId } } },
      });

      return res.status(200).send(response);
    }

    const book = await Book.findFirst({
      where: { id: bookId },
      include: {
        stacks: {
          select: {
            stack: { select: { id: true, type: true } },
            addedAt: true,
            stackId: true,
            bookId: true,
          },
        },
      },
    });

    if (!book) return res.status(400).send();
    
    const currentPrimaryStackId = book.stacks.find(
      (stack) => stack.stack.type !== 'other'
    )!.stackId;

    const response = await Book.update({
      where: { id: bookId },
      data: {
        stacks: {
          delete: {
            bookId_stackId: { stackId: currentPrimaryStackId, bookId }
          },
          create: {
            stackId
          }
        },
      },
    });

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
