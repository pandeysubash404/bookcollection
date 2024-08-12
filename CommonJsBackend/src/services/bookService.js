const Book = require("../models/Book.model.js");

const createBook = async (title, author) => {
  const book = await Book.create(title, author);
  return book;
};

const getBooks = async () => {
  const books = await Book.findAll();
  return books;
};

const getBookById = async (id) => {
  const book = await Book.findByPk(id);
  return book;
};

const updateBook = async (id, data) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error("Book not found");

  const updatedBook = await Book.update(id, data);
  return updatedBook;
};

const deleteBook = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error("Book not found");

  await Book.delete(id);
  return "book deleted successfully !!";
};

module.exports = { createBook, updateBook, deleteBook, getBooks, getBookById };
