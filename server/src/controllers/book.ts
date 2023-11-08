import { Book } from '../models';
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

export async function addBookToStack(req: Request, res: Response) {
  try {
    const stackId = Number(req.params.stackId);

    const bookData = req.body;
    const newBook = await Book.create({
      data: { ...bookData, stacks: { create: { stackId } } },
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
