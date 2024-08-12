import express from 'express';
import cors from 'cors';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import setupSwagger from './utils/swagger.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Swagger setup
setupSwagger(app);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
