import React, { useState } from 'react';
import api from '../../services/api';

const AddBook = ({ token, onBookAdded }) => {
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createBook(token, newBook);
      onBookAdded(response.data);
      setNewBook({ title: '', author: '' });
    } catch (error) {
      alert('Failed to add book');
    }
  };

  return (
    <form onSubmit={handleAddBook} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
