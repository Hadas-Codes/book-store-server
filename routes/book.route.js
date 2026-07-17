import express from 'express';
import { 
    getAllBooks, 
    addBook, 
    updateBook, 
    borrowBook, 
    returnBook, 
    deleteBook 
} from '../controllers/book.controller.js';

import validateBody from '../middlewares/validationMiddleware.js';
import { bookSchema } from '../validators/bookValidator.js';

const router = express.Router();

router.get('/', getAllBooks);

router.post('/', validateBody(bookSchema), addBook);

router.put('/:code', validateBody(bookSchema), updateBook);

router.post('/:code/borrow', borrowBook);
router.post('/:code/return', returnBook);
router.delete('/:code', deleteBook);

export default router;