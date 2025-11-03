import mongoose from 'mongoose';
import User from '../models/User.js';
import fs from 'fs';
import imageKit from '../config/imageKit.js';
import { stripTypeScriptTypes } from 'module';


// Get user data using userId
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.auth;
        const user = await User.findById(userId);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


// Updata user data
export const updateUserData = async (req, res) => {
    try {
        const { userId } = req.auth;
        let { username, bio, location, full_name } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        }

        !username && (username = user.username);
        !bio && (bio = user.bio);
        !full_name && (full_name = user.full_name);
        
        const updatedData = {
            username,
            bio,
            full_name,
            location
        }

        const profile = req.files.profile && req.files.profile[0];
        const cover = req.files.cover && req.files.cover[0];

        if (profile) {
            const buffer = fs.readFileSync(profile.path);

            const response = await imageKit.upload({
                file: buffer,
                fleName: profile.oringinalname
            })

            const url = imageKit.url({
                path: response.filePath,
                trunsformation: [
                    { quality: "auto" },
                    { format: "webp" },
                    {width: "1280"}
                ]
            })

            updateUserData.profile_picture = url;
            const blob = await fetch(url).then(res => res.blob());
            await clerkClient.users.updateUserProfileImage(userId, { file: blob });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

//find Users using username , email , location m nane

export const discoverUsers = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { input } = req.body;

        const allUsers = await User.find({
            $or: [
                {username: new RegExp(input , 'i')},
                {email: new RegExp(input , 'i')},
                {full_name: new RegExp(input , 'i')},
                {location: new RegExp(input , 'i')}
            ]
        })
        const filteredUsers = allUsers.filter(user => user._id !== userId);
        res.status(200).json({
            success: true,
            filteredUsers
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}



//follow user

export const followUser = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { id } = req.body;

        const user = await User.findById(userId);

        if (user.following.includes(id)) {
            return res.status(200).json({
                success: true,
                message: "You already following this User"
            })
        }

        user.following.push(id);
        await user.save();

        const toUser = await User.findById(id);
        toUser.followers.push(userId);

        res.status(200).json({
            success: true,
            message: `Now you following the  ${user.full_name}`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}



//Unfollow the User

export const unfollowUser = async (req, res) => {
    try {

        const { userId } = req.auth;
        const { id } = req.body;

        const user = await User.findById(userId);
        user.following = user.following.filter(user => user._id !== id);
        await save();

        const toUser = await User.find(id);
        toUser.followers = toUser.followers.filter(user => user._id !== userId);
        toUser.save();

        res.status(200).json({
            message: `Your unfollowed the ${toUser.full_name}`,
            success : true
        })
         
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


//send Connections

export const sendConnectionRequest = async (req, res) => {
    
    try {
        
        const { userId } = req.auth;
        const { id } = req.body;
        
        
    } catch (error) {
        
    }
}