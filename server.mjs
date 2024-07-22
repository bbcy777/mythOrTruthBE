import express from 'express';
import connectDB from './config/db.mjs';
import dotenv from 'dotenv';

import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

//Initialize middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));