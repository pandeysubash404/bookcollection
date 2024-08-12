import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import generateToken from '../config/jwt.js';

export const register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create(username,hashedPassword);
  const token = generateToken(user);
  return { token };
};

export const login = async (username, password) => {
  const user = await User.findOne(username);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken(user);
  return { token };
};
