import express from 'express';
import { check, validationResult } from 'express-validator';
import Question from '../models/Question.mjs';
import mongoose from 'mongoose';

const router = express.Router();

//CRUD, get, post, update, delete

//test
// router.get('/', (req, res) => res.send('Question Route'));
//@route: GET questions
//@access: Public
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        console.error({error: [{msg: 'Server Error'}]});
    }
})

//@route: POST
router.post('/', [
    check('question', 'Please add the question').not().isEmpty(),
    check('answer', 'Answer must be a boolean value').isBoolean()
], async(req, res) =>{
    //Check if any validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const newQuestion = req.body;
        const question = await Question.create(newQuestion);
        res.status(200).json(question);
    } catch (err) {
        console.error({error: [{msg: 'Server Error'}]})
    }
})

//get random 10 questions
router.get('/random10', async(req, res) => {
    try {
        const questions = await Question.aggregate([
            { $sample: { size: 10 }}
        ]);
        res.json(questions);
    } catch (err) {
        res.status(500).send({error: [{msg: 'Server error'}]})
    }
})

//@route: GET a question by id
router.get('/:id', async (req, res) => {
    try{
        const questionId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(questionId)){
            return res.status(400).json({error: [{msg: 'Invalid Question ID'}]})
        }
        const item = await Question.findById(questionId);

        if (!item) {
            return res.status(404).json({error: [{msg: `Item doesn't exist`}]});
        } else {
            res.status(200).json(item);
        }
    } catch(err) {
        res.status(500).send({error: [{msg: 'Server Error'}]});
    }
})

//@route: Update a question
router.put('/:id', async (req, res) => {
    try{
        const questionId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(questionId)){
            console.log('Invalid Question ID:', questionId);
            return res.status(400).json({error: [{msg: 'Invalid Question ID'}]})
        };
        const newDocument = req.body
        const itemUpdate = await Question.findByIdAndUpdate(questionId,newDocument, {new: true, runValidators: true});
        if (!itemUpdate) {
            console.log(`Item doesn't exist: ${questionId}`);
            return res.status(404).json({error: [{msg: `Item doesn't exist`}]});
        };
        res.status(200).json(itemUpdate);
    } catch(err) {
        console.error('Server Error:', err);
        res.status(500).send({error: [{msg: 'Server Error'}]})
    }
})

//@route: Delete a question
router.delete('/:id', async (req, res) =>{
    try{
        const questionId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({error: [{msg: 'Invalid Question ID'}]});
        };
        const deleteQuestion = await Question.findByIdAndDelete(questionId);
        if (!deleteQuestion) {
            return res.status(404).json({error: [{msg: `Item doesn't exist`}]});
        };
        res.status(200).json({'Item deleted: ': deleteQuestion});
    } catch (err) {
        res.status(500).send({error: [{msg: 'Server error'}]})
    }
});


export default router;