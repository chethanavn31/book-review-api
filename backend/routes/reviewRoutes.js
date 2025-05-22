import express from 'express';
import { updateReview, deleteReview } from '../controllers/reviewController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// Only authenticated users can add a book


router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
