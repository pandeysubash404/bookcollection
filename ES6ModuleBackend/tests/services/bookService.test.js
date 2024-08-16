import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../../src/services/bookService.js';
import Book from '../../src/models/Book.model.js';

jest.mock('../../src/models/Book.model.js');

describe('Book Service', () => {
  describe('createBook', () => {
    it('should create a new book and return it', async () => {
      const mockBook = { id: 1, title: 'Test Book', author: 'Test Author' };
      Book.create.mockResolvedValue(mockBook);

      const result = await createBook('Test Book', 'Test Author');

      expect(Book.create).toHaveBeenCalledWith('Test Book','Test Author');
      expect(result).toEqual(mockBook);
    });
  });

  describe('getBooks', () => {
    it('should return all books', async () => {
      const mockBooks = [
        { id: 1, title: 'Test Book 1', author: 'Test Author 1' },
        { id: 2, title: 'Test Book 2', author: 'Test Author 2' },
      ];
      Book.findAll.mockResolvedValue(mockBooks);

      const result = await getBooks();

      expect(Book.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockBooks);
    });
  });

  describe('getBookById', () => {
    it('should return a book by id', async () => {
      const mockBook = { id: 1, title: 'Test Book', author: 'Test Author' };
      Book.findByPk.mockResolvedValue(mockBook);

      const result = await getBookById(1);

      expect(Book.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockBook);
    });

    it('should return null if book is not found', async () => {
      Book.findByPk.mockResolvedValue(null);

      const result = await getBookById(1);

      expect(Book.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });
  });

  it('should update a book and return it', async () => {
    const mockBook = { id: 1, title: 'Test Book', author: 'Test Author' };
    const updatedData = { title: 'Updated Test Book', author: 'Updated Test Author' };
    const updatedBook = { ...mockBook, ...updatedData };
    
    // Mock the update method to return the updated book
    Book.update.mockResolvedValue(updatedBook); 
    Book.findByPk.mockResolvedValueOnce(updatedBook);

    const result = await updateBook(1, updatedData);
    expect(Book.findByPk).toHaveBeenCalledWith(1);
    expect(Book.update).toHaveBeenCalledWith(1, updatedData);
    expect(result).toEqual(updatedBook);
  });

  describe('deleteBook', () => {
    it('should delete a book and return a success message', async () => {
      const mockBook = { id: 1, title: 'Test Book', author: 'Test Author', destroy: jest.fn() };
      Book.findByPk.mockResolvedValue(mockBook);
      mockBook.destroy.mockResolvedValue();

      const result = await deleteBook(1);

      expect(Book.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBe("book deleted successfully !!");
    });

    it('should throw an error if book is not found', async () => {
      Book.findByPk.mockResolvedValue(null);

      await expect(deleteBook(1)).rejects.toThrow('Book not found');
      expect(Book.findByPk).toHaveBeenCalledWith(1);
    });
  });
});
