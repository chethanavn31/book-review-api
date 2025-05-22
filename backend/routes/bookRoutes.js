import express from 'express';
import { addBook, getBooks, getBookById } from '../controllers/bookController.js';
import { submitReview } from '../controllers/reviewController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// Only authenticated users can add a book
router.post('/', protect, addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/:id/reviews', protect, submitReview);


export default router;
