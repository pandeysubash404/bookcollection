const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User.model.js");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing Authorization Header" });
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid Token" });
  }
};

module.exports = authMiddleware;
