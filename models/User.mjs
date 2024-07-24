import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    questionsTaken: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

const User = mongoose.model('user', UserSchema)
export default User;