import { User } from '../db/schemas';
import { IUser } from '../interfaces';

export const findAllUsersService = async () => {
  const findUsersRequest = await User.findAll();
  return findUsersRequest;
};

// find one user

// create user
export const createUserService = async (newUser: IUser) => {
  const createUserRequest = await User.create(newUser);
  return createUserRequest;
};
