import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers';

const userRouter = Router();

// GET - users
userRouter.get('/all', getAllUsers);
userRouter.post('/', createUser);

export default userRouter;
