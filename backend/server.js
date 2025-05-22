import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';



// Load env vars
dotenv.config();

// Connect to MongoDB


const app = express();



app.use(express.json());



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server running on port ${PORT}`);
});
