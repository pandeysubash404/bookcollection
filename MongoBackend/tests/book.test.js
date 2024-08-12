//tests/book.test.js
import request from 'supertest';
import app from '../src/app.js';
// import User from '../src/models/userModel.js';
import Book from '../src/models/bookModel.js';
import testDb from '../src/utils/testDb.js';


let token;
let bookId;


afterAll(async () => {
  await testDb.clear();
  await testDb.close();
});


beforeAll(async () => {
  await testDb.connect();
  // await User.deleteMany({});
  // await Book.deleteMany({});
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      password: 'testpassword',
    });
  token = res.body.token;
});
describe('Book Endpoints', () => {
  

  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Book',
        author: 'Test Author',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    bookId=res.body._id;
  });

  it('should get all books', async () => {
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it('should get a book', async () => {
    const book = await Book.findOne({ title: 'Test Book' });
    const res = await request(app)
      .get(`/api/books/${book._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should update a new book', async () => {
    const book = await Book.findOne({ title: 'Test Book' });
    const res = await request(app)
      .put(`/api/books/${book._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        author: 'Test Authors',
      });
    expect(res.body.author).toBe('Test Authors');
  });
  
  it('should delete a book', async () => {
    const book = await Book.findOne({ title: 'Test Book' });
    const res = await request(app)
      .delete(`/api/books/${book._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

});
