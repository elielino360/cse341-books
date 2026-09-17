import { getDb } from '../db/connect.js';


// Get all books
const getAllBooks = async () => {
  const db = getDb();

  const books = await db.collection('books').find({}).toArray();

  return books;
};


// Get one book by ID
const getBookById = async (bookId) => {
  const db = getDb();

  const book = await db.collection('books').findOne({ id: bookId });

  return book;
};


// Check if an author exists
const authorExists = async (authorId) => {
  const db = getDb();

  const author = await db.collection('authors').findOne({ id: authorId });

  return author !== null;
};


// Create a book
const createBook = async (book) => {
  const db = getDb();

  const result = await db.collection('books').insertOne(book);

  return result;
};


// Update a book
const updateBook = async (bookId, book) => {
  const db = getDb();

  const result = await db.collection('books').updateOne(
    { id: bookId },
    {
      $set: {
        authorId: book.authorId,
        title: book.title,
        publicationDate: book.publicationDate
      }
    }
  );

  return result;
};


// Delete a book
const deleteBook = async (bookId) => {
  const db = getDb();

  const result = await db.collection('books').deleteOne({ id: bookId });

  return result;
};


export {
  getAllBooks,
  getBookById,
  authorExists,
  createBook,
  updateBook,
  deleteBook
};