import { Router } from 'express';
import * as User from './controllers/user';
import * as Book from './controllers/book';
import * as Stack from './controllers/stack';

const router = Router();

router.route('/users').get(User.getAllUsers).post(User.createUser);

router.route('/books').get(Book.getAllBooks);

router.route('/stacks').get(Stack.getAllStacks).post(Stack.addStack);

router.route('/stacks/:stackId').get(Book.getBooksInStack).post(Book.addBookToStack);

export default router;

//ignore users until I do auth
//need to edit endpoints so that books are always placed in a certain stack defined in query params
//define initial stacks in create user
