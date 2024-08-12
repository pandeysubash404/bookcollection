import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import LandingPage from '../components/LandingPage';

test('renders the landing page', () => {
  render(<LandingPage />);


  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Welcome to Book Collection/);

  
  expect(screen.getByText(/Book Collection is an amazing platform to manage your books/)).toBeInTheDocument();

  
  const registerLink = screen.getByRole('link', { name: /Register/i });
  expect(registerLink).toBeInTheDocument();
  expect(registerLink).toHaveAttribute('href', '/register');

  
  const loginLink = screen.getByRole('link', { name: /Login/i });
  expect(loginLink).toBeInTheDocument();
  expect(loginLink).toHaveAttribute('href', '/login');
});
