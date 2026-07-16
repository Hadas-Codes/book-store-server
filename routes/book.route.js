import express from 'express';
import { 
    getAllBooks, 
    addBook, 
    updateBook, 
    borrowBook, 
    returnBook, 
    deleteBook 
} from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', addBook);
router.put('/:code', updateBook);
router.post('/:code/borrow', borrowBook);
router.post('/:code/return', returnBook);
router.delete('/:code', deleteBook);

export default router;