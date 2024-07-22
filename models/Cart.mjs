import mongoose, { Schema } from "mongoose";
import User from "./User.mjs";

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }
})
const Cart = mongoose.model('cart', CartSchema);

export default Cart;