const initializePool = require("../config/db.js");

const User = {
  async create(username, password) {
    const pool = await initializePool();
    // const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const updatedAt = createdAt;

    const [result] = await pool.query(
      "INSERT INTO users (username, password, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
      [username, password, createdAt, updatedAt]
    );
    return result.insertId;
  },

  async findOne(username) {
    const pool = await initializePool();
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  },

  async findByPk(id) {
    const pool = await initializePool();
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },
};

module.exports = User;
