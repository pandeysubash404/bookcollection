import { register, login } from '../services/authService.js';

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await register(username, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
