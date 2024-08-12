import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';

const DeleteBook = ({ token, bookId, onDelete }) => {
  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await api.deleteBook(token, bookId);
        onDelete(bookId);
      } catch (error) {
        alert('Failed to delete book');
      }
    }
  };

  return (
    <button
      onClick={handleDeleteClick}
      className="text-red-500 hover:text-red-700"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteBook;
