// import mongoose from 'mongoose';
// import User from '../models/User.js';
// import fs from 'fs';
// import imageKit from '../config/imageKit.js';
// import { inngest } from '../inngest/index.js'
// import Connection from '../models/Connection.js';
// import Post from '../models/Post.js'


// // Get user data using userId
// export const getUserData = async (req, res) => {
//     try {
//         const { userId } = req.auth;
//         const user = await User.findById(userId);
//         res.status(200).json({
//             success: true,
//             user
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }


// // Updata user data
// export const updateUserData = async (req, res) => {
//     try {
//         const { userId } = req.auth;
//         let { username, bio, location, full_name } = req.body;
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found',
//                 success: false
//             })
//         }

//         !username && (username = user.username);
//         !bio && (bio = user.bio);
//         !full_name && (full_name = user.full_name);
        
//         const updatedData = {
//             username,
//             bio,
//             full_name,
//             location
//         }

//         const profile = req.files.profile && req.files.profile[0];
//         const cover = req.files.cover && req.files.cover[0];

//         if (profile) {
//             const buffer = fs.readFileSync(profile.path);

//             const response = await imageKit.upload({
//                 file: buffer,
//                 fleName: profile.oringinalname
//             })

//             const url = imageKit.url({
//                 path: response.filePath,
//                 trunsformation: [
//                     { quality: "auto" },
//                     { format: "webp" },
//                     {width: "1280"}
//                 ]
//             })

//             updateUserData.profile_picture = url;
//             const blob = await fetch(url).then(res => res.blob());
//             await clerkClient.users.updateUserProfileImage(userId, { file: blob });
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }

// //find Users using username , email , location m nane

// export const discoverUsers = async (req, res) => {
//     try {
//         const { userId } = req.auth;
//         const { input } = req.body;

//         const allUsers = await User.find({
//             $or: [
//                 {username: new RegExp(input , 'i')},
//                 {email: new RegExp(input , 'i')},
//                 {full_name: new RegExp(input , 'i')},
//                 {location: new RegExp(input , 'i')}
//             ]
//         })
//         const filteredUsers = allUsers.filter(user => user._id !== userId);
//         res.status(200).json({
//             success: true,
//             filteredUsers
//         })
        
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }



// //follow user

// export const followUser = async (req, res) => {
//     try {
//         const { userId } = req.auth;
//         const { id } = req.body;

//         const user = await User.findById(userId);

//         if (user.following.includes(id)) {
//             return res.status(200).json({
//                 success: true,
//                 message: "You already following this User"
//             })
//         }

//         user.following.push(id);
//         await user.save();

//         const toUser = await User.findById(id);
//         toUser.followers.push(userId);

//         res.status(200).json({
//             success: true,
//             message: `Now you following the  ${user.full_name}`
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }



// //Unfollow the User

// export const unfollowUser = async (req, res) => {
//     try {

//         const { userId } = req.auth;
//         const { id } = req.body;

//         const user = await User.findById(userId);
//         user.following = user.following.filter(user => user._id !== id);
//         await save();

//         const toUser = await User.find(id);
//         toUser.followers = toUser.followers.filter(user => user._id !== userId);
//         toUser.save();

//         res.status(200).json({
//             message: `Your unfollowed the ${toUser.full_name}`,
//             success : true
//         })
         
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }


// //send Connections

// export const sendConnectionRequest = async (req, res) => {
    
//     try {
        
//         const { userId } = req.auth;
//         const { id } = req.body;

//         const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
//         const connectiponRequests = await Connection.find({ form_use_id: userId, created_at: { $gt: last24Hours } });
//         if (connectiponRequests.length >= 20) {
//             return res.status(200).json({
//                 message: "Your reach the todays limit",
//                 success: false
//             })
//         }

//         //check user are already connected 
//         const connection = await Connection.findOne({
//             $or: [
//                 {from_use_id : userId , to_user_id : id},
//                 {from_use_id : id , to_user_id : userId}
//             ]
//         })

//         if (!connection) {
//             const newConnection = await Connection.create({
//                 from_user_id: userId,
//                 to_user_id: id
//             })

//             await inngest.send({
//                 name: 'app/connection-request',
//                 data: {connectionId: newConnection._id}
//             })
//         }
        
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }

// //get User conncetion

// export const getUserConnections = async (req, res) => {
    
//     try {
        
//         const { userId } = req.auth;

//         const user = await User.find(userId).populate('connnections followers following');

//         const connections = user.connctions;
//         const followers = user.followers;
//         const following = user.following;

//         const pendingConncections = (await Connection.find({ to_user_id: userId, status: 'pending' }).populate('from_user_id')).map(connection => connection.from_use_id);

//         res.status(200).json({
//             success: true,
//             connections,
//             followers,
//             following,
//             pendingConncections
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }

// //accept connection

// export const acceptConnctionRequest = async (req, res) => {
    
//     try {
        
//         const { userId } = req.auth;
//         const { id } = req.body;

//         const connection = await Connection.findOne({ from_user_id: id, to_user_id: userId });
        
//         if (!connection) {
//             return res.status(404).json({
//                 message: "Conncetion Not Found",
//                 success : false
//             })
//         }

//         const user = await User.findById(userId);
//         user.connections.push(id);
//         await user.save();

//         const toUser = await User.findById(id);
//         toUser.connections.push(userId);
//         await toUser.save();

//         connection.status = 'accepted';
//         await connection.save();

//         res.status(200).json({
//             message: "Connection Accepted Sucessfully",
//             success : true
//         })

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }


// // Get User Profile

// export const getUserProfile = async (req, res) => {
    
//     try {
//         const { profileId } = req.body;
        
//         const profile = await User.findById(profileId);
//         if (!profile) {
//             return res.status(404).json({
//                 message: "Profile not found",
//                 success : false
//             })
//         }
//         const posts = await Post.find({ user: profileId }).populate('user');
//         res.status(200).json({
//             success: true,
//             posts,
//             profile
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }