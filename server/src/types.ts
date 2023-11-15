export type newBook = {
  primaryStack: 'tbr' | 'current' | 'finished';
  title: string;
  userId: number;
  author: string;
  totalPages: number;
  currentPage?: number;
  bookType?: string;
  publisher?: string;
  ISBN?: string;
  OLID?: string;
  description?: string;
  hasImg?: boolean;
}

export type Book = newBook & {id: number}