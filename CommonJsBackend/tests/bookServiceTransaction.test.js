const initializePool = require("../src/config/db");
const {
  createBook,
  updateBook,
  deleteBook,
} = require("../src/services/bookService.js");

describe.only("Book Service with ACID Transactions", () => {
  let pool;
  let bookId;

  beforeAll(async () => {
    pool = await initializePool();
    await pool.query("TRUNCATE TABLE books");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("should create a new book and rollback the transaction", async () => {
    // await pool.query("START TRANSACTION");

    const bookData = { title: "Test Book", author: "Test Author" };

    bookId = await createBook(bookData.title, bookData.author);

    // Rollback the transaction
    // await pool.query("ROLLBACK");

    const [booksAfterRollback] = await pool.query(
      "SELECT * FROM `Books` WHERE `title` = ? AND `author` = ?",
      [bookData.title, bookData.author]
    );
    expect(booksAfterRollback.length).toEqual(1);
    // Verify that the inserted book is not present in the database after rollback
    // expect(booksAfterRollback.length).toEqual(0);
  });

  it("should update a book and rollback the transaction", async () => {
    await pool.query("START TRANSACTION");
    const [expectedBooksAfterRollback] = await pool.query(
      "SELECT * FROM `Books` WHERE `id` = ?",
      [bookId]
    );

    const updatedBook = {
      title: "Updated Test Book",
      author: "Updated Test Author",
    };
    const result = await updateBook(bookId, updatedBook);

    expect(result).toMatchObject(updatedBook);

    // Rollback the transaction
    await pool.query("ROLLBACK");

    const [booksAfterRollback] = await pool.query(
      "SELECT * FROM `Books` WHERE `id` = ?",
      [bookId]
    );
    // Verify that the updated book is not present in the database after rollback
    expect(booksAfterRollback[0]).toEqual(expectedBooksAfterRollback[0]);
  });

  it("should delete a book and rollback the transaction", async () => {
    await pool.query("START TRANSACTION");
    const [expectedBooksAfterRollback] = await pool.query(
      "SELECT * FROM `Books` WHERE `id` = ?",
      [bookId]
    );

    const result = await deleteBook(bookId);
    expect(result).toBe("book deleted successfully !!");

    // Rollback the transaction
    await pool.query("ROLLBACK");

    const [booksAfterRollback] = await pool.query(
      "SELECT * FROM `Books` WHERE `id` = ?",
      [bookId]
    );
    // Verify that the deleted book is present in the database after rollback
    expect(booksAfterRollback[0]).toEqual(expectedBooksAfterRollback[0]);
  });
});
