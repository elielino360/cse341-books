import {getBooksHandler,getBookByIdHandler } from './controllers/books.js';
import express from 'express';  

const router = express.Router();

router.get('/books', getBooksHandler);  

router.get('/books/:id', getBookByIdHandler);

export default router;