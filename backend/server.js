import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';

import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js'

// Load env vars
dotenv.config();

// Connect to MongoDB


const app = express();



app.use(express.json());


app.use('/', authRoutes);
app.use('/books', bookRoutes);
app.use('/reviews',reviewRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server running on port ${PORT}`);
});
