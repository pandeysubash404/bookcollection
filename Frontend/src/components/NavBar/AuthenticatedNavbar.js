import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticatedNavbar = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(navigate);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">My Book Collection</div>
      <div className="flex items-center">
        <span className="text-white mr-4">Welcome, {username}</span>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AuthenticatedNavbar;
