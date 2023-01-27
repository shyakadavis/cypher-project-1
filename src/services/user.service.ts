import { User } from '../db/schemas';
import { IUpdateData, IUser } from '../interfaces';

export const findAllUsersService = async () => {
  const findUsersRequest = await User.findAll();
  return findUsersRequest;
};

// find one user
export const findOneUserService = async (userId: string) => {
  const findOneUserRequest = await User.findOne({ where: { id: userId } });
  return findOneUserRequest;
};
// create user
export const createUserService = async (newUser: IUser) => {
  const createUserRequest = await User.create(newUser);
  return createUserRequest;
};

// update user info - their billing address
export const updateUserInfoService = async (
  userId: string,
  updateData: IUpdateData,
) => {
  const updateUserInfoRequest = await User.update(
    {
      province: updateData.province,
      district: updateData.district,
      sector: updateData.sector,
      cell: updateData.cell,
      street: updateData.street,
    },
    { where: { id: userId } },
  );
  return updateUserInfoRequest;
};
