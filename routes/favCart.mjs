import express from 'express';
import mongoose from 'mongoose';
import Question from '../models/Question.mjs';
import Cart from '../models/Cart.mjs';
import User from '../models/User.mjs';

const router = express.Router();

//user can add/remove favorite question to their dashboard /favcart/:userid
//get 
router.get('/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        console.log('user ID: ', userId);
        if (!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({error: [{msg: 'Invalid User ID'}]})
        }
        const favCart = await Cart.findOne({user: userId});
        console.log('Favorite Cart:', favCart); 
        if (!favCart) {
            return res.status(404).json({error: [{msg: `User doesn't have a favorite list`}]});
        } else {
            res.status(200).json(favCart.questions);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send({error: [{msg: 'Server Error'}]});
    }
})

//@route: add a favorite question
router.post('/:id/:questionId', async (req, res) => {
    try{
        const userId = req.params.id;
        const questionId = req.params.questionId;
        if (!mongoose.Types.ObjectId.isValid(userId)){
            console.log('Invalid user ID:', userId);
            return res.status(400).json({error: [{msg: 'Invalid user ID'}]})
        };
        if (!mongoose.Types.ObjectId.isValid(questionId)){
            console.log('Invalid Question ID:', questionId);
            return res.status(400).json({error: [{msg: 'Invalid Question ID'}]})
        };

        const favCart = await Cart.findOne({user: userId});

        if (!favCart.questions.includes(questionId)) {
            favCart.questions.push(questionId);
            await favCart.save();
        }
        res.status(200).json(favCart);
    } catch(err) {
        console.error('Server Error:', err);
        res.status(500).send({error: [{msg: 'Server Error'}]})
    }
})

//@route: Delete a favorite question
router.delete('/:id/:questionId', async (req, res) =>{
    try{
        const userId = req.params.id;
        const questionId = req.params.questionId;
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({error: [{msg: 'Invalid User ID'}]});
        };
        if(!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({error: [{msg: 'Invalid Question ID'}]});
        };

        const favCart = await Cart.findOne({user: userId})
        if (!favCart) {
            return res.status(404).json({error: [{msg: `User doesn't have favorate list`}]});
        };
        favCart.questions = favCart.questions.filter(id => id.toString() !== questionId)
        await favCart.save();
        res.status(200).json({msg: 'Item deleted successful'});
    } catch (err) {
        res.status(500).send({error: [{msg: 'Server error'}]})
    }
});


export default router;