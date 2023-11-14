import { Book, Stack } from '../utils/types';

const url = 'http://localhost:3000';

export async function getUserStacks(userId: number) {
  const response = await fetch(`${url}/users/${userId}/stacks`, {
    method: 'GET',
  });

  const stacks = await response.json();
  return stacks;
}

export async function getUserBooks(userId: number) {
  const response = await fetch(`${url}/users/${userId}/books`, {
    method: 'Get',
  });

  const books = await response.json();
  return books;
}

export async function getBooksInStack(stackId: number) {
  const respsonse = await fetch(`${url}/stacks/${stackId}`, {
    method: 'GET',
  });

  const books = await respsonse.json();
  return books;
}

export async function addNewBookToStack(
  stackId: number,
  stackType: string,
  book: Book
) {
  const response = await fetch(`${url}/stacks/${stackType}/${stackId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

  const newBook = await response.json();
  return newBook;
}

export async function editBook(book: Partial<Book>) {
  console.log(book);
  const response = await fetch(`${url}/books/${book.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

  const updatedBook = await response.json();
  return updatedBook;
}

export async function deleteBookFromStack(
  bookId: number,
  stackId: number,
  stackType: string
) {
  const response = await fetch(
    `${url}/stacks/${stackType}/${stackId}/${bookId}`,
    {
      method: 'DELETE',
    }
  );

  return response;
}

export async function getBookById(bookId: number) {
  const response = await fetch(`${url}/books/${bookId}`, {
    method: 'GET',
  });

  const book = await response.json();

  return book;
}

export async function deleteStack(stackId: number) {
  const response = await fetch(`${url}/stacks/${stackId}`, {
    method: 'DELETE',
  });

  return response;
}

export async function addStack(name: string): Promise<Stack> {
  const response = await fetch(`${url}/stacks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  return await response.json();
}

export async function editStack(name: string, stackId: number): Promise<Stack> {
  const response = await fetch(`${url}/stacks/${stackId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  return await response.json();
}

export async function addExistingBookToStack(
  bookId: number,
  stackType: string,
  stackId: number
) {
  const response = await fetch(
    `${url}/stacks/${stackType}/${stackId}/${bookId}`,
    {
      method: 'POST',
    }
  );

  return await response.json();
}

export async function switchPrimaryStack(
  bookId: number,
  fromStackType: string,
  toStackType: string
) {
  const response = await fetch(`${url}/books/${bookId}/${fromStackType}/${toStackType}`, {
    method: 'PUT'
  })

  const updatedBook = await response.json()
  return updatedBook;
}
