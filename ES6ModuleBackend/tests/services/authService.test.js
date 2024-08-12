import bcrypt from 'bcryptjs';
import { register, login } from '../../src/services/authService.js';
import User from '../../src/models/User.model.js';
import generateToken from '../../src/config/jwt.js';

jest.mock('../../src/models/User.model.js');
jest.mock('bcryptjs');
jest.mock('../../src/config/jwt.js');

describe('Auth Service', () => {
  describe('register', () => {
    it('should register a new user and return a token', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };
      bcrypt.hash.mockResolvedValue('hashedpassword');
      User.create.mockResolvedValue(mockUser);
      generateToken.mockReturnValue('mockToken');

      const result = await register('testuser', 'testpassword');

      expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', 10);
      expect(User.create).toHaveBeenCalledWith('testuser','hashedpassword');
      expect(generateToken).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ token: 'mockToken' });
    });
  });

  describe('login', () => {
    it('should login an existing user and return a token', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      generateToken.mockReturnValue('mockToken');

      const result = await login('testuser', 'testpassword');

      expect(User.findOne).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'hashedpassword');
      expect(generateToken).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ token: 'mockToken' });
    });

    it('should throw an error if user is not found', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(login('testuser', 'testpassword')).rejects.toThrow('User not found');
      expect(User.findOne).toHaveBeenCalledWith('testuser' );
    });

    it('should throw an error if password does not match', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(login('testuser', 'testpassword')).rejects.toThrow('Invalid credentials');
      expect(User.findOne).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'hashedpassword');
    });
  });
});
