import express from 'express';
import bookRouter from './book.route.js';
import userRouter from './user.route.js';

const router = express.Router();

router.use('/books', bookRouter);
router.use('/users', userRouter);

export default router;