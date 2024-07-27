import express from 'express';
import connectDB from './config/db.mjs';
import dotenv from 'dotenv';
import userLogin from './routes/userLogin.mjs';
import userSinup from './routes/userSignup.mjs';
import questions from './routes/questions.mjs';
import favCart from './routes/favCart.mjs'

import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//Connect Database
connectDB();

//Initialize middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log('Containing the data:');
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });
  
//Define Routes
app.use('/user/login', userLogin);
app.use('/user/signup', userSinup);
app.use('/questions', questions);
app.use('/user/:id/favcart', favCart)

//Single endpoint just to test API. Send data to browser
app.get('/', (req, res) => res.send('API Running'))

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));