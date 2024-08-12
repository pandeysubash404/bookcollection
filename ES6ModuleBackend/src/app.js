import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
