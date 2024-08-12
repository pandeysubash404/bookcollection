const bcrypt = require("bcryptjs");
const User = require("../models/User.model.js");
const generateToken = require("../config/jwt.js");

const register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create(username, hashedPassword);
  const token = generateToken(user);
  return { token };
};

const login = async (username, password) => {
  const user = await User.findOne(username);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user);
  return { token };
};

module.exports = { register, login };
