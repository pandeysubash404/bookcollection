//tests/auth.test.js
import request from "supertest";
import app from "../src/app.js";
// import User from '../src/models/userModel.js';
import testDb from '../src/utils/testDb.js';

beforeAll(async () => {
  await testDb.connect();
});

afterAll(async () => {
  await testDb.clear();
  await testDb.close();
});


describe("Auth Endpoints", () => {

  // beforeAll(async () => {
  //   await User.deleteMany({});
  // });


  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});

