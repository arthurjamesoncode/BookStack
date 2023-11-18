import prisma from './index';

export async function getAllNotes() {
  const notes = await prisma.note.findMany();

  return notes;
}

export async function create(bookId: number, text: string) {
  const newNote = prisma.note.create({ data: { bookId, text } });

  return newNote;
}

export async function getNotesByBook(bookId: number) {
  const notes = await prisma.note.findMany({
    where: { bookId },
  });

  return notes;
}

export async function getNotesByBookWithBookTitle(bookId: number) {
  const notes = await prisma.note.findMany({
    where: { bookId },
    include: { book: { select: { title: true } } },
  });

  return notes;
}
