import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'

import {signUp,logIn,logOut} from './controller/authController.js';

dotenv.config();

const PORT = process.env.PORT;

const server = express();

server.use(express.json());

//auth routes
server.post('/api/v1/auth/signup',(req,res) => signUp(req,res));
server.post('/api/v1/auth/login',(req,res) => logIn(req,res));
server.post('/api/v1/auth/logout',(req,res) => logOut(req,res));

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });

// MongoDB setup
const MONGO_URI = process.env.MONGO_URI;
await mongoose.connect(MONGO_URI).catch((err)=>console.log(`DB Error: ${err}`));


