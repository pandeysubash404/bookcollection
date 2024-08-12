import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import {EditBook, DeleteBook} from './index.js'

const ViewBooks = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.getBooks(token);
        setBooks(response);
      } catch (error) {
        alert('Failed to fetch books');
      }
    };
    fetchBooks();
  }, [token]);

  const handleBookDeleted = async (bookId) => {
   setBooks(books.filter(book => book.id !== bookId));
  };

  const handleBookUpdated = (updatedBook) => {
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
    setEditingBook(null);
  };

  return (
    <div>
      {editingBook ? (
        <EditBook token={token} book={editingBook} onBookUpdated={handleBookUpdated} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Author</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-2 border-b">{book.title}</td>
                  <td className="px-4 py-2 border-b">{book.author}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => setEditingBook(book)}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <DeleteBook 
                      token={token} 
                      bookId={book.id} 
                      onDelete={handleBookDeleted} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewBooks;
