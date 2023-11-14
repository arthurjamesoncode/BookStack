import { Book, Note } from '../models';
import { Request, Response } from 'express';

export async function getAllNotes(req: Request, res: Response) {
  try {
    const notes = await Note.findMany();
    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function addNote(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);
    const newNoteData = req.body;

    const newNote = await Note.create({ data: { ...newNoteData, bookId } });
    res.status(201).send(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getNotesByBook(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);

    const notes = await Note.findMany({ where: { bookId } });
    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getNotesByUser(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);

    const books = await Book.findMany({ where: { userId } });

    const notes = books.map((book) => {
      return Note.findMany({
        where: { bookId: book.id },
        include: {
          book: { select: { title: true } },
        },
      });
    });

    res.status(200).send(notes);
  } catch (error) {}
}
