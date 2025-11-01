import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { inngest , functions} from './inngest/index.js';
import { serve } from 'inngest/express';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
await connectDB();
app.use(clerkMiddleware());


app.get('/', (req, res) => {
    res.send('API is running...');
})
app.use('api/inngest', serve({client: inngest, functions}));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} \u2611`);
})