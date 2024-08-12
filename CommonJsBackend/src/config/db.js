const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

let pool;

const initializePool = async () => {
  if (!pool) {
    try {
      pool = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // default value is the same as `connectionLimit`
        idleTimeout: 60000, // default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      });

      // Test connection to verify that the database exists
      await pool.query("SELECT 1");
      console.log("Database connection pool created successfully.");

      // Create the `books` table if it doesn't exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS books (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL,
          createdAt DATETIME NOT NULL,
          updatedAt DATETIME NOT NULL
        )
      `);

      // Create the `users` table if it doesn't exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          createdAt DATETIME NOT NULL,
          updatedAt DATETIME NOT NULL
        )
      `);
    } catch (error) {
      console.error("Error creating database connection pool:", error);
      if (error.code === "ER_BAD_DB_ERROR") {
        console.error(`Database "${process.env.DB_NAME}" does not exist.`);
      }
      throw error;
    }
  }
  return pool;
};

module.exports = initializePool;
