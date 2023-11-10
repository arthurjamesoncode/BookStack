export type Stack = {
  id: number;
  title: string;
  userId: number;
  type: string;
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

export type SearchResult = {
  title: string;
  edition_count: number;
  edition_key: string[];
  cover_edition_key: string;
  author_name: string[];
}

export type SearchResponse = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: SearchResult[]
}

export type SearchResultDetails = {
  publishers: string[];
  description?: {value: string};
  isbn_13: string[];
  number_of_pages?: number,
}

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
};

export type NumberFormField = {
  type: 'number',
  id: string,
  placeholder: string;
  min: number,
  required: boolean
  label: string
}

export type FormField = RadioFormField | TextFormField | NumberFormField;