const request = require("supertest");
const app = require("../../src/app.js");
const initializePool = require("../../src/config/db.js");

let pool;
let token;
let bookId;

beforeAll(async () => {
  pool = await initializePool();
  // Truncate tables
  await pool.query("TRUNCATE TABLE users");
  await pool.query("TRUNCATE TABLE books");

  await request(app).post("/api/auth/register").send({
    username: "testuser",
    password: "testpassword",
  });

  const res = await request(app).post("/api/auth/login").send({
    username: "testuser",
    password: "testpassword",
  });

  token = res.body.token;
});

afterAll(async () => {
  await pool.end();
});

describe("Book Endpoints", () => {
  it("should create a new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Book",
        author: "Test Author",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    bookId = res.body.id;
  });

  it("should get all books", async () => {
    const res = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it("should get a book", async () => {
    const res = await request(app)
      .get(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("should update a new book", async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        author: "Test Authors",
      });
    expect(res.body.author).toBe("Test Authors");
  });

  it("should delete a book", async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
