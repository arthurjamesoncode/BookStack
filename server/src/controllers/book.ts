import * as Book from '../models/book';
import * as Stack from '../models/stack';
import { Request, Response } from 'express';

export async function getAllBooks(req: Request, res: Response) {
  try {
    const books = await Book.getAllBooks();
    res.status(200).send(books);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getBookById(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);
    const book = await Book.getBookById(bookId);

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
    let primaryStack = type;

    const stacks: { stackId: number }[] = [{ stackId }];

    if (type === 'other') {
      const tbr = await Stack.findPrimarystack(userId, 'tbr');
      primaryStack = 'tbr';
      stacks.push({ stackId: tbr!.id });
    }

    const bookData = { ...req.body, userId, primaryStack };

    const newBook = await Book.createAndConnectToStacks(bookData, stacks);

    res.status(201).send(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getBooksInStack(req: Request, res: Response) {
  try {
    const stackId = Number(req.params.stackId);

    const books = await Book.getBooksInStack(stackId);

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

    const book = await Book.updateById(bookId, bookData);

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
      const deletedBook = await Book.deleteById(bookId);

      return res.status(200).send(deletedBook);
    }

    const updatedBook = await Book.deleteFromStack(bookId, stackId);

    res.status(201).send(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getBooksByUser(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);

    const books = await Book.getBooksByUser(userId);

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
      const response = await Book.addBookToStack(bookId, stackId);

      return res.status(200).send(response);
    }

    const book = await Book.getBookById(bookId, true, true);

    if (!book) return res.status(400).send();

    const currentPrimaryStackId = book.stacks.find(
      (stack) => stack.stack.type !== 'other'
    )!.stackId;

    const response = await Book.switchStacks(bookId, currentPrimaryStackId, stackId, type)

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function switchPrimaryStack(req: Request, res: Response) {
  try {
    const [bookId, fromStackType, toStackType] = [
      Number(req.params.bookId),
      req.params.fromStackType as 'tbr' | 'current' | 'finished',
      req.params.toStackType as 'tbr' | 'current' | 'finished',
    ];

    const userId = 1;

    const fromStack = await Stack.findPrimarystack(userId, fromStackType);
    const toStack = await Stack.findPrimarystack(userId, toStackType);

    const updatedBook = await Book.switchStacks(
      bookId,
      fromStack!.id,
      toStack!.id,
      toStackType
    );

    res.status(200).send(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
