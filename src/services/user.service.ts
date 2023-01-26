import { User } from '../db/schemas';

export const findAllUsersService = async () => {
  const users = await User.findAll();
  return users;
};
