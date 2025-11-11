import express from 'express';
// import { getChatMessages, sendMessage, sseController } from '../controllers/messageController.js';
// import { upload } from '../configs/multer.js';
// import { protect } from '../middlewares/auth.js';
import { upload } from '../config/multer.js';
import protect from '../middleware/Auth.js';
import { getChatMessages , sendMessage , sseController } from '../controller/messageController.js';



const messageRouter = express.Router();

messageRouter.get('/:userId', sseController)
messageRouter.post('/send', upload.single('image'), protect, sendMessage)
messageRouter.post('/get', protect, getChatMessages)

export default messageRouter