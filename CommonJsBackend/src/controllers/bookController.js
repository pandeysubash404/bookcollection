const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../services/bookService.js");

const createBookHandler = async (req, res) => {
  try {
    const { title, author } = req.body;
    const bookId = await createBook(title, author);
    const book = await getBookById(bookId);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBooksHandler = async (req, res) => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBookByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBookHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await updateBook(id, req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBookHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBook(id);
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBookHandler,
  getBookByIdHandler,
  getBooksHandler,
  updateBookHandler,
  deleteBookHandler,
};
