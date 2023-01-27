import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateBillingAddress,
} from '../controllers';
import { UserSchema, ValidateJoi } from '../middleware/validation';

const userRouter = Router();

userRouter.get('/all', getAllUsers); // get all users
userRouter.get('/:id', getOneUser); //get one user
userRouter.post('/', ValidateJoi(UserSchema.user.create), createUser); // create user
userRouter.patch(
  '/:id',
  ValidateJoi(UserSchema.user.update),
  updateBillingAddress,
); // updating billing address

export default userRouter;
