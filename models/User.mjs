import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    questionsTaken: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    favoriteQuestions:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

const User = mongoose.model('User', UserSchema)
export default User;