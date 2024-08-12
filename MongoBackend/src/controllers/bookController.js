import Book from '../models/bookModel.js';

const getBooks = async (req, res) => {
  const books = await Book.find({ user: req.user._id });
  res.json(books);
};

const getBook = async (req, res) => {
  const book = await Book.findById({ user: req.user._id, _id:req.params.id});
  res.json(book);
};

const addBook = async (req, res) => {
  const { title, author } = req.body;

  const book = new Book({
    title,
    author,
    user: req.user._id,
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
};

const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book && book.user.toString() === req.user._id.toString()) {
    await Book.deleteOne({ _id: req.params.id });
    res.json({ message: 'Book removed' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

const updateBook = async (req, res) => {
  const { title, author } = req.body;

  // Find the book by ID
  const book = await Book.findById(req.params.id);

  if (book && book.user.toString() === req.user._id.toString()) {
    // Update the book's details
    book.title = title || book.title;
    book.author = author || book.author;

    // Save the updated book
    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found or not authorized' });
  }
};

export { getBooks, getBook, addBook, deleteBook, updateBook };

