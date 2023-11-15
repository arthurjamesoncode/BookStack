import prisma from './index';

export async function getAllNotes() {
  const notes = await prisma.note.findMany();

  return notes;
}

export async function create(bookId: number, text: string) {
  const newNote = prisma.note.create({ data: { bookId, text } });

  return newNote;
}

export async function getNotesByBook(
  bookId: number,
  includeBookTitle: boolean = false
) {
  const notes = await prisma.note.findMany({
    where: { bookId },
    include: { book: { select: { title: includeBookTitle } } },
  });

  return notes;
}
