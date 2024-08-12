import initializePool from "../config/db.js";

const Book = {
  async create(title, author) {
    const pool = await initializePool();
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const updatedAt = createdAt;
    const [result] = await pool.query(
      "INSERT INTO books (title, author, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
      [title, author, createdAt, updatedAt]
    );
    return result.insertId;
  },

  async findAll() {
    const pool = await initializePool();
    const [rows] = await pool.query("SELECT * FROM books");
    return rows;
  },

  async findOne(title) {
    const pool = await initializePool();
    const [rows] = await pool.query("SELECT * FROM books WHERE title = ?", [
      title,
    ]);
    return rows[0];
  },

  async findByPk(id) {
    const pool = await initializePool();
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, data) {
    const pool = await initializePool();
    const { title, author } = data;
    const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    // const [result] = await pool.query(
    //   'UPDATE books SET title = ?, author = ?, updatedAt=? WHERE id = ?',
    //   [title, author, updatedAt, id]
    // );

    // Prepare the SQL update query and parameters
    let query = "UPDATE books SET updatedAt = ?";
    const params = [updatedAt];

    if (title !== undefined) {
      query += ", title = ?";
      params.push(title);
    }

    if (author !== undefined) {
      query += ", author = ?";
      params.push(author);
    }

    query += " WHERE id = ?";
    params.push(id);

    // console.log(query);

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      throw new Error("Book not found");
    }
    return await this.findByPk(id);
  },

  async delete(id) {
    const pool = await initializePool();
    const [result] = await pool.query("DELETE FROM books WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error("Book not found");
    }
    return result.affectedRows;
  },
};

export default Book;
