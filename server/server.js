import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import  connectDB  from './config/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

dotenv.config();
await connectDB();
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('App is working');
})

app.use("/api/inngest", serve({ client: inngest, functions }));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})