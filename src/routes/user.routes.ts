import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers';
import { UserSchema, ValidateJoi } from '../middleware/validation';

const userRouter = Router();

userRouter.get('/all', getAllUsers); // get all users
userRouter.post('/', ValidateJoi(UserSchema.user.create), createUser); // create user

export default userRouter;
