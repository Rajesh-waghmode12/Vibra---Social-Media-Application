import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    bio: {
        type: String,
        default: 'Hey there! I am using Vibra,',
    },
    profile_picture: {
        type: String,
        default : ''
    },
    cover_photo: {
        type: String,
        default: ''
    },
    followers: [{ type: String, ref: 'User' }],
    following: [{ type: String, ref: 'User' }],
    connections: [{ type: String, ref: 'User' }]

});

const User = mongoose.model('User', userSchema);
export default User;