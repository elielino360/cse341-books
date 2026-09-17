import {getAllBooks, getBookById,authorExists,createBook,updateBook,deleteBook  } from '../models/books.js';

// GET /books
const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);

  } catch (error) {
    console.error('Error fetching books:', error.message);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};


// GET /books/:id
const getBookByIdHandler = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await getBookById(bookId);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(200).json(book);

  } catch (error) {
    console.error('Error fetching book:', error.message);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};


// POST /books
const createBookHandler = async (req, res) => {
  const { id, authorId, title, publicationDate } = req.body;

  // Validate required fields
  if (!id || !authorId || !title || !publicationDate) {
    return res.status(400).json({
      message: 'id, authorId, title, and publicationDate are required.'
    });
  }

  try {
    // Check whether the author exists
    const exists = await authorExists(authorId);

    if (!exists) {
      return res.status(400).json({
        message: 'Author does not exist.'
      });
    }

    // Create the book object
    const newBook = {
      id,
      authorId,
      title,
      publicationDate
    };

    await createBook(newBook);

    return res.status(201).json({
      message: 'Book created successfully',
      book: newBook
    });

  } catch (error) {
    console.error('Error creating book:', error.message);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};


// PUT /books/:id
const updateBookHandler = async (req, res) => {
  const bookId = req.params.id;

  const { authorId, title, publicationDate } = req.body;

  // Validate required fields
  if (!authorId || !title || !publicationDate) {
    return res.status(400).json({
      message: 'authorId, title, and publicationDate are required.'
    });
  }

  try {
    // Check whether the book exists
    const existingBook = await getBookById(bookId);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    // Check whether the author exists
    const exists = await authorExists(authorId);

    if (!exists) {
      return res.status(400).json({
        message: 'Author does not exist.'
      });
    }

    const updatedBook = {
      authorId,
      title,
      publicationDate
    };

    await updateBook(bookId, updatedBook);

    return res.status(200).json({
      message: 'Book updated successfully',
      book: {
        id: bookId,
        ...updatedBook
      }
    });

  } catch (error) {
    console.error('Error updating book:', error.message);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};


// DELETE /books/:id
const deleteBookHandler = async (req, res) => {
  const bookId = req.params.id;

  try {
    // Check whether the book exists
    const existingBook = await getBookById(bookId);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    await deleteBook(bookId);

    return res.status(204).send();

  } catch (error) {
    console.error('Error deleting book:', error.message);

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};




export { getBooksHandler,getBookByIdHandler,createBookHandler,updateBookHandler,deleteBookHandler}; 