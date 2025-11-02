import express from 'express';
import protect from '../middleware/auth.js';
import { getUserData } from '../controller/userController.js';


const userRouter = express.Router();



userRouter.get('/data', protect, getUserData);










export default userRouter;