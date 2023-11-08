import { Router } from 'express';
import * as User from './controllers/user';
import * as Book from './controllers/book';
import * as Stack from './controllers/stack';

const router = Router();

router.route('/users').get(User.getAllUsers).post(User.createUser);

router.route('/books').get(Book.getAllBooks).post(Book.addBook);

router.route('/stacks').get(Stack.getAllStacks).post(Stack.addStack)

export default router;
