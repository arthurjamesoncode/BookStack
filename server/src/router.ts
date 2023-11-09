import { Router } from 'express';
import * as User from './controllers/user';
import * as Book from './controllers/book';
import * as Stack from './controllers/stack';

const router = Router();

router.route('/users').get(User.getAllUsers).post(User.createUser);

router.route('/users/:userId/stacks').get(Stack.getUserStacks);

router.route('/books').get(Book.getAllBooks);
router.route('/books/:bookId').put(Book.editBook);

router.route('/stacks').get(Stack.getAllStacks).post(Stack.addStack);

router
  .route('/stacks/:stackId')
  .get(Book.getBooksInStack)
  .post(Book.addNewBookToStack);

router
  .route('/stacks/:type/:stackId/:bookId')
  .post(Book.addExistingBookToStack)
  .delete(Book.deleteBookFromStack);

export default router;

//ignore users until I do auth
