import { Book } from "../types";

const url = 'http://localhost:3000';

export async function getUserStacks(userId: number) {
  const response = await fetch(`${url}/users/${userId}/stacks`, {
    method: 'GET',
  });

  const stacks = await response.json();

  return stacks;
}

export async function getBooksInStack(stackId: number) {
  const respsonse = await fetch(`${url}/stacks/${stackId}`, {
    method: 'GET',
  });

  const books = await respsonse.json();

  return books
}

export async function addNewBookToStack(stackId : string, stackType: string, book : Book) {
  const response = await fetch(`${url}/stacks/${stackType}/${stackId}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(book)
  })

  const newBook = await response.json();

  return newBook;
}
