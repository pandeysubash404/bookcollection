import React, { useState } from 'react';
import api from '../../services/api';

const EditBook = ({ token, book, onBookUpdated }) => {
  const [updatedBook, setUpdatedBook] = useState({ title: book.title, author: book.author });

  const handleEditBook = async (e) => {
    e.preventDefault();
    try {
      const response = await api.updateBook(token, book.id, updatedBook);
      onBookUpdated(response);
    } catch (error) {
      alert('Failed to update book');
    }
  };

  return (
    <form onSubmit={handleEditBook} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Title"
          value={updatedBook.title}
          onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Author"
          value={updatedBook.author}
          onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Update Book
      </button>
    </form>
  );
};

export default EditBook;
