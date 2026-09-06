import {getBooksHandler } from './controllers/books.js';
import express from 'express';  

const router = express.Router();

router.get('/books', getBooksHandler);  

export default router;