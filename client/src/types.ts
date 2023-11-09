export type Stack = {
  id: number;
  title: string;
  userId: number;
  type: String;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  bookType: string;
  publisher: string;
  ISBN: string;
  OLID: string;
  description: String;
};
