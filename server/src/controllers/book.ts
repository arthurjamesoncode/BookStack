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

export async function addBook(req: Request, res: Response) {
  try {
    const bookData = req.body;
    const newBook = await Book.create({data: bookData});

    res.status(201).send(newBook)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
