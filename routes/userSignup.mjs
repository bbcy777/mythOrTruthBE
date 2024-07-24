import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User.mjs';

const router = express.Router();

// @route:   POST /users/signup
// @desc:    Create route
// @access:  Public
router.post('/', [
    check('userName', 'User name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
    //Check if any validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //Destructure our req
    const {userName, email, password} = req.body
    console.log(req.body)
    try {
        //Check if user already exists
        let user = await User.findOne({email});
        //If they exist respond with error, same format
        if(user) {
            return res.status(400).json({errors: [{ msg: 'User Already Exist'}]})
        }
        //Check if username already exists
        let username = await User.findOne({userName});
        if(username) {
            return res.status(400).json({errors: [{ msg: 'User Name Already Exist'}]})
        }

        //Create a user
        user = new User ({
            userName,
            email,
            password,
        })
        
        //Encrypt password
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)
        console.log(user)
        await user.save()

        //Creating payload (data for the front end) for jwt
        const payload = {
            user: {
                id: user.id,
                // name: user.name
            }
        }

        //Creating a jwt, signing, and if there are no errors, sending token to the front end
        jwt.sign(
            payload, 
            process.env.jwtSecret,
            {expiresIn: 3600}, //Expiration data/time
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        )

    } catch (err) {
        console.error(err)
        res.status(500).json({errors: [{msg: 'Server Error'}]})
    }
})

export default router;