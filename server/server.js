import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
await connectDB();
app.use(clerkMiddleware());


app.get('/', (req, res) => {
    res.send('API is running...');
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} \u2611`);
})