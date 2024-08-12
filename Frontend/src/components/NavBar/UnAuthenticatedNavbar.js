import React from 'react';
import { Link } from 'react-router-dom';

const UnauthenticatedNavbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">Book Collection</Link>
      <div className="flex items-center">
        <Link to="/" className="text-white mr-4">Home</Link>
        <Link to="/login" className="text-white mr-4">Login</Link>
        <Link to="/register" className="text-white">Register</Link>
      </div>
    </div>
  </nav>
);

export default UnauthenticatedNavbar;
