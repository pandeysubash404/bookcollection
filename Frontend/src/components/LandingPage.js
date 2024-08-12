import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Book Collection</h1>
        <p className="text-gray-700 mb-6">
          Book Collection is an amazing platform to manage your books. 
          Easily register, log in, and add your favorite books to your collection. 
          Start exploring now!
        </p>
        <div className="space-x-4">
          <a href="/register" className="bg-blue-500 text-white py-2 px-4 rounded">Register</a>
          <a href="/login" className="bg-blue-500 text-white py-2 px-4 rounded">Login</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
