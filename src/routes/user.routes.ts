import { Router, Request, Response } from 'express';
import { getAllUsers } from '../controllers';

const userRouter = Router();

// GET - users
userRouter.get('/all', getAllUsers);

export default userRouter;
