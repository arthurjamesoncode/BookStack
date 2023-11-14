export type Stack = {
  id: number;
  name: string;
  userId: number;
  type: string;
};

export type Book = {
  id: number;
  primaryStack: 'tbr' | 'current' | 'finished';
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  bookType: string;
  publisher: string;
  ISBN: string;
  OLID: string;
  description: string;
  hasImg: boolean;
};

export type Note = {
  id: number;
  bookId: number;
  text: string;
  page?: number;
  createdAt: Date; 
}

export type SearchResult = {
  title: string;
  edition_count: number;
  edition_key: string[];
  cover_edition_key: string;
  author_name: string[];
};

export type SearchResponse = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: SearchResult[];
};

export type SearchResultDetails = {
  publishers?: string[];
  description?: { value: string };
  isbn_13?: string[];
  number_of_pages?: number;
};

export type RadioFormField = {
  type: 'radio';
  group: string;
  options: { value: string; label: string }[];
  label: string;
};

export type TextFormField = {
  type: 'textarea' | 'text';
  id: string;
  placeholder: string;
  required: boolean;
  label: string;
  maxlength?: number;
};

export type NumberFormField = {
  type: 'number' | 'range';
  id: string;
  placeholder: string;
  min: number;
  max?: number;
  required: boolean;
  label: string;
  step?: number;
};

export type FormField = RadioFormField | TextFormField | NumberFormField;
