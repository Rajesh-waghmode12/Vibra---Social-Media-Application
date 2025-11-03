// import express from 'express';
// import protect from '../middleware/auth.js';
// import { acceptConnctionRequest, discoverUsers, followUser, getUserConnections, getUserData, getUserProfile, sendConnectionRequest, unfollowUser, updateUserData } from '../controller/userController.js';
// import { upload } from '../config/multer.js';
// import { Profiler } from 'react';

// const userRouter = express.Router();



// userRouter.get('/data', protect, getUserData);
// userRouter.post('/update', upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), protect, updateUserData);
// userRouter.post('discover', protect, discoverUsers);
// userRouter.post('/follow', protect, followUser);
// userRouter.post('./unfollow', protect, unfollowUser);
// userRouter.post('/connect', protect, sendConnectionRequest);
// userRouter.post('/accept', protect, acceptConnctionRequest);
// userRouter.get('/connections', protect, getUserConnections);
// userRouter.post('/profiles', getUserProfile);




// export default userRouter;