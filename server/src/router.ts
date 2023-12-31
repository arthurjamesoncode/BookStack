import { Router } from 'express';
import * as User from './controllers/user';
import * as Book from './controllers/book';
import * as Stack from './controllers/stack';
import * as Note from './controllers/note';

const router = Router();

router.get('/users', User.getAllUsers);
router.post('/users', User.createUser);

router.get('/users/:userId/stacks', Stack.getUserStacks);
router.get('/users/:userId/books', Book.getBooksByUser);

router.get('/books', Book.getAllBooks);
router.get('/books/:bookId', Book.getBookById)
router.put('/books/:bookId', Book.editBook); //behind auth middleware
router.put('/books/:bookId/:fromStackType/:toStackType', Book.switchPrimaryStack)
router.get('/books/stacks/:bookId', Stack.getStacksWithBook)

router.get('/stacks', Stack.getAllStacks);
router.post('/stacks', Stack.addStack); //behind auth middleware

router.get('/stacks/:stackId', Book.getBooksInStack);
router.put('/stacks/:stackId', Stack.editStack);
router.delete('/stacks/:stackId', Stack.deleteStack);
router.post('/stacks/:type/:stackId', Book.addNewBookToStack); //behind auth middleware

router.post('/stacks/:type/:stackId/:bookId', Book.addExistingBookToStack); //behind auth middleware
router.delete('/stacks/:type/:stackId/:bookId', Book.deleteBookFromStack); //behind auth middleware

router.get('/notes', Note.getAllNotes)

router.get('/notes/:bookId', Note.getNotesByBook)
router.post('/notes/:bookId', Note.addNote)

export default router;

//ignore users until I do auth
