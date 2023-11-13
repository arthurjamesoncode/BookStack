import { FormField } from './types';

export const BookFormFields: FormField[] = [
  {
    type: 'text',
    id: 'title',
    placeholder: 'Enter the title: ',
    required: true,
    label: 'Title: ',
    maxlength:255
  },
  {
    type: 'text',
    id: 'author',
    placeholder: 'Enter the author: ',
    required: true,
    label: 'Author: ',
    maxlength: 255,
  },
  {
    type: 'number',
    id: 'totalPages',
    placeholder: '',
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
    maxlength: 255
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
    maxlength: 13
  },
  {
    type: 'text',
    id: 'OLID',
    placeholder: 'Enter the title: ',
    required: false,
    label: 'OLID: ',
    maxlength: 15,
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

export const StackFormFields: FormField[] = [
  {
    type: 'text',
    id: 'name',
    placeholder: 'Enter a name for your stack',
    required: true,
    label: 'Name: '
  }
]

export const PageFormFields: FormField[] = [
  {
    type: 'number',
    id: 'pages',
    placeholder: '',
    min: 0,
    required: true,
    label: 'How many pages did you read?'
  }
]