import mongoose, { Schema } from "mongoose";
import Question from "./Question.mjs";

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
})
const Cart = mongoose.model('Cart', CartSchema);

export default Cart;