import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthenticatedNavbar, UnAuthenticatedNavbar } from './components/NavBar';
import { Login, Register } from './components/Auth';
import BookCollection from './components/BookCollection';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, [token, username]);

  const handleLogout = (navigate) => {
    setToken('');
    setUsername('');
    navigate('/');
  };

  return (
    <Router>
      {token ? (
        <AuthenticatedNavbar username={username} onLogout={handleLogout} />
      ) : (
        <UnAuthenticatedNavbar />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/book-collection" 
          element={
            <ProtectedRoute token={token}>
              <BookCollection token={token} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
