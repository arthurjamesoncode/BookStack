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

export async function addNewBookToStack(req: Request, res: Response) {
  try {
    const [type, stackId] = [req.params.type, Number(req.params.stackId)];
    const userId = 1; //will take this from a token / session after doing auth

    const bookData = req.body;

    const stacks : {[key : string]: number | string}[] = [{ id: stackId }]

    if (type === 'other') {
      const tbr = await Stack.findFirst({where: {userId, type: 'tbr'}});
      stacks.push({id: tbr!.id});
    };

    const newBook = await Book.create({
      data: { ...bookData, stacks: { connect: stacks} },
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
            id: stackId,
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

    let response: Object;
    if (type === 'other') {
      const book = await Book.findFirst({
        where: { id: bookId },
        include: {
          stacks: { select: { id: true } },
        },
      });

      const updatedBook = await Book.update({
        where: { id: bookId },
        data: {
          stacks: { set: book!.stacks.filter((stack) => stack.id != stackId) },
        },
      });

      console.log('woof');

      response = updatedBook;
    } else {
      response = await Book.delete({ where: { id: bookId } });
    }

    res.status(200).send(response);
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
        data: { stacks: { connect: { id: stackId } } },
      });

      return res.status(200).send(response);
    }

    const book = await Book.findFirst({
      where: { id: bookId },
      include: { stacks: { select: { id: true, type: true } } },
    });

    if (!book) return res.status(400).send();
    const currentStacks = book.stacks;

    const newStacks = currentStacks
      .filter((stack) => stack.type === 'other')
      .concat([{ id: stackId, type }]);

    const response = await Book.update({
      where: { id: bookId },
      data: { stacks: { set: newStacks } },
    });

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
