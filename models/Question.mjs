import mongoose, { Types } from "mongoose";
import User from "./User.mjs";

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: Boolean,
        required: true,
    },
    idea: {
        type: String
    },
    source: {
        type: String,
    },
    numTaken: {
        type: Number,
    },
    correctAnswer: {
        type: Number,
    },
    category: {
        type: String,
        enum: ['environment', 'energy', 'health'],
    }
})

const Question = mongoose.model('question', QuestionSchema);

export default Question;