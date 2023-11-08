import { Router } from 'express';
import * as User from './controllers/user';
import * as Book from './controllers/book';

const router = Router();

router.route('/users').get(User.getAllUsers).post(User.createUser);

router.route('/books').get(Book.getAllBooks).post(Book.addBook);

export default router;
