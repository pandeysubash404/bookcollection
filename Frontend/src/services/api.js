import axios from 'axios';

const API_URL = process.env.API_URL||'http://localhost:5000/api';

const register = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    username,
    password,
  });
  return response.data;
};

const login = async (username, password) => {
  console.log(username, password);
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  console.log(response);
  return response.data;
};

const getBooks = async (token) => {
  // console.log(token);
  const response = await axios.get(`${API_URL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response);
  return response.data;
};

const createBook = async (token, newBook) => {
  console.log(token, newBook);
  const response = await axios.post(
    `${API_URL}/books`,
    newBook,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const updateBook = async (token, bookId, updatedBook) => {
  console.log('Token: ',token);
  const response = await axios.put(`${API_URL}/books/${bookId}`, updatedBook, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteBook = async (token, id) => {
  const response = await axios.delete(`${API_URL}/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export default {
  register,
  login,
  createBook,
  getBooks,
  // getBook,
  updateBook,
  deleteBook,
};
