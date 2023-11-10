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