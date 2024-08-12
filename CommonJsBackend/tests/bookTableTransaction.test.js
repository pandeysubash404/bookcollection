const initializePool = require("../src/config/db");

describe.only("Book Table with ACID Transactions", () => {
  let pool;

  beforeAll(async () => {
    pool = await initializePool();
  });

  beforeEach(async () => {
    await pool.query("START TRANSACTION");
  });

  afterEach(async () => {
    await pool.query("ROLLBACK");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("should create a new book and rollback the transaction", async () => {
    const bookData = { title: "Test Book", author: "Test Author" };

    // Insert a book within the transaction
    await pool.query(
      "INSERT INTO `Books` (`title`, `author`, `createdAt`, `updatedAt`) VALUES (?, ?, NOW(), NOW())",
      [bookData.title, bookData.author]
    );

    await pool.query(
      "SELECT * FROM `Books` WHERE `title` = ? AND `author` = ?",
      [bookData.title, bookData.author]
    );

    // Rollback the transaction
    await pool.query("ROLLBACK");

    const [booksAfterRollback] = await pool.query(
      "SELECT * FROM `Books` WHERE `title` = ? AND `author` = ?",
      [bookData.title, bookData.author]
    );
    // Verify that the inserted book is not present in the database after rollback
    expect(booksAfterRollback.length).toBe(0);
  });
});
