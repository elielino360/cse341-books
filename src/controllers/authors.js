import { getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks } from '../models/authors.js';


const getAllAuthorsHandler = async (req, res) => {
  try {
    const authors = await getAllAuthors();

    return res.status(200).json(authors);
  } catch (error) {
    console.error('Failed to retrieve authors:', error.message);

    return res.status(500).json({
      message: 'Unable to retrieve authors'
    });
  }
};


const getAuthorByIdHandler = async (req, res) => {
  try {
    const requestedId = req.params.id;

    const author = await getAuthorById(requestedId);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Failed to retrieve author:', error.message);

    return res.status(500).json({
      message: 'Unable to retrieve author'
    });
  }
};

const createAuthorHandler = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;

    if (!id || !name || birthYear === undefined) {
      return res.status(400).json({
        message: 'id, name, and birthYear are required'
      });
    }

    const existingAuthor = await getAuthorById(id);

    if (existingAuthor) {
      return res.status(400).json({
        message: 'Author ID already exists'
      });
    }

    const newAuthor = {
      id,
      name,
      birthYear
    };

    await createAuthor(newAuthor);

    return res.status(201).json(newAuthor);
  } catch (error) {
    console.error('Failed to create author:', error.message);

    return res.status(500).json({
      message: 'Unable to create author'
    });
  }
};

const updateAuthorHandler = async (req, res) => {
  try {
    const requestedId = req.params.id;
    const { name, birthYear } = req.body;

    if (!name || birthYear === undefined) {
      return res.status(400).json({
        message: 'name and birthYear are required'
      });
    }

    const existingAuthor = await getAuthorById(requestedId);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found'
      });
    }

    const updatedAuthor = {
      name,
      birthYear
    };

    await updateAuthor(requestedId, updatedAuthor);

    return res.status(200).json({
      id: requestedId,
      ...updatedAuthor
    });
  } catch (error) {
    console.error('Failed to update author:', error.message);

    return res.status(500).json({
      message: 'Unable to update author'
    });
  }
};

const deleteAuthorHandler = async (req, res) => {
  try {
    const requestedId = req.params.id;

    const existingAuthor = await getAuthorById(requestedId);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found'
      });
    }

    const hasBooks = await authorHasBooks(requestedId);

    if (hasBooks) {
      return res.status(409).json({
        message: 'Cannot delete author because the author still has books'
      });
    }

    await deleteAuthor(requestedId);

    return res.status(204).send();
  } catch (error) {
    console.error('Failed to delete author:', error.message);

    return res.status(500).json({
      message: 'Unable to delete author'
    });
  }
};

export {getAllAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler
};

