import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import promptRoute from './routes/promptRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
     .then(() => {
          console.log('Connected to MongoDB');
     })
     .catch(err => {
          console.error('MongoDB connection error:', err);
     });

// Routes
app.use('/api/users', userRoute);
app.use('/api/prompts', promptRoute);

app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
});