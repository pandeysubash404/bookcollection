import Book from '../models/Book.model.js';

export const createBook = async (title, author) => {
  const book = await Book.create(title, author);
  return book;
};

export const getBooks = async () => {
  const books = await Book.findAll();
  return books;
};

export const getBookById = async (id) => {
  const book = await Book.findByPk(id);
  return book;
};

export const updateBook = async (id, data) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error('Book not found');
  
  const updatedBook = await Book.update(id, data);
  return updatedBook;
};

export const deleteBook = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error('Book not found');

  await Book.delete(id);
  return "book deleted successfully !!";
};
