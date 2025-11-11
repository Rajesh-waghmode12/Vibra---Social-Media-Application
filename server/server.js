import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import  connectDB  from './config/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import { clerkMiddleware } from '@clerk/express';
import userRouter from './routes/userRoute.js';
import storyRouter from './routes/storyRoutes.js';
import postRouter from './routes/postRoutes.js';
import messageRouter from './routes/messageRoutes.js';


dotenv.config();
await connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())


app.get('/', (req, res) => {
    res.send('App is working');
})

app.use("/api/inngest", serve({ client: inngest, functions }));


app.use('/api/uesr', userRouter);
app.use('/api/post', postRouter);
app.use('/api/story', storyRouter)
app.use('/api/message', messageRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})


