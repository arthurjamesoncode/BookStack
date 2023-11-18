import { Request, Response } from 'express';

import * as Note from '../models/note';
import * as Book from '../models/book'

export async function getAllNotes(req: Request, res: Response) {
  try {
    const notes = await Note.getAllNotes();
    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function addNote(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);
    const { text } = req.body;

    const newNote = await Note.create(bookId, text);
    res.status(201).send(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getNotesByBook(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);

    const notes = await Note.getNotesByBook(bookId);
    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getNotesByUser(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);

    const books = await Book.getBooksByUser(userId);

    const notes = books.map((book) => {
      return Note.getNotesByBookWithBookTitle(book.id);
    });

    res.status(200).send(notes);
  } catch (error) {}
}
