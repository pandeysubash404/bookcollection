import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createBookHandler, getBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler } from '../controllers/bookController.js';

const router = Router();

router.post('/', authMiddleware, createBookHandler);
router.get('/', authMiddleware, getBooksHandler);
router.get('/:id', authMiddleware, getBookByIdHandler);
router.put('/:id', authMiddleware, updateBookHandler);
router.delete('/:id', authMiddleware, deleteBookHandler);

export default router;
