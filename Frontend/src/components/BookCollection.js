import React, { useState } from 'react';
import { AddBook, ViewBooks } from './CRUD';

const BookCollection = ({ token }) => {
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  const handleBookAdded = (newBook) => {
    // You can handle any additional logic here when a book is added
    setShowAddBookForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Book Collection</h1>
      <button
        onClick={() => setShowAddBookForm(!showAddBookForm)}
        className="mb-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
      >
        {showAddBookForm ? 'Cancel' : 'Add Book'}
      </button>
      {showAddBookForm ? (
        <AddBook token={token} onBookAdded={handleBookAdded} />
      ) : (
        <ViewBooks token={token} />
      )}
    </div>
  );
};

export default BookCollection;
