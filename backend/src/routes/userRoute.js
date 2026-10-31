import express from 'express';
import { createUser } from '../controllers/userController.js';
import { use } from 'react';


const userRouter = express.Router();


userRouter.post('/', createUser);



export default userRouter;