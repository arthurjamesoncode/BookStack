import { FormField } from '../../types';

export const BookFormFields: FormField[] = [
  {
    type: 'text',
    id: 'title',
    placeholder: 'Enter the title: ',
    required: true,
    label: 'Title: ',
  },
  {
    type: 'text',
    id: 'author',
    placeholder: 'Enter the author: ',
    required: true,
    label: 'Author: ',
  },
  {
    type: 'number',
    id: 'totalPages',
    placeholder: '0',
    min: 1,
    required: true,
    label: 'Total Pages: ',
  },
  {
    type: 'text',
    id: 'publisher',
    placeholder: 'Enter publisher: ',
    required: false,
    label: 'Publisher: ',
  },
  {
    type: 'radio',
    group: 'bookType',
    label: 'Book Type: ',
    options: [
      { value: 'paper', label: 'Paper: ' },
      { value: 'e-book', label: 'E-Book: ' },
      { value: 'audio-book', label: 'Audio Book: ' },
    ],
  },
  {
    type: 'text',
    id: 'ISBN',
    placeholder: 'Enter ISBN: ',
    required: false,
    label: 'ISBN: ',
  },
  {
    type: 'text',
    id: 'OLID',
    placeholder: 'Enter the title: ',
    required: false,
    label: 'OLID: ',
  },
  {
    type: 'textarea',
    id: 'description',
    placeholder: 'Enter description: ',
    required: false,
    label: 'Description: ',
  },
];

export const SearchFormFields: FormField[] = [
  {
    type: 'text',
    id: 'searchText',
    placeholder: 'search for a book',
    required: false,
    label: '',
  },
];
