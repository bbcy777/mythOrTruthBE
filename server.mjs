import express from 'express';
import connectDB from './config/db.mjs';
import dotenv from 'dotenv';
import userLogin from './routes/userLogin.mjs';
import userSinup from './routes/userSignup.mjs';
import questions from './routes/questions.mjs';

import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//Connect Database
connectDB();

//Initialize middleware
app.use(cors());
app.use(express.json({ extended: false }));

//Define Routes
app.use('/user/login', userLogin);
app.use('/user/signup', userSinup);
app.use('/questions', questions);

//Single endpoint just to test API. Send data to browser
app.get('/', (req, res) => res.send('API Running'))

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));