import request from "supertest";
import app from "../../src/app.js";
import initializePool from "../../src/config/db.js";
 
let pool;

beforeAll(async () => {
  pool = await initializePool();
  // Truncate tables
  await pool.query('TRUNCATE TABLE users');
});

afterAll(async () => {
  await pool.end();
});

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser1",
      password: "testpassword1",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "testuser1",
      password: "testpassword1",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
