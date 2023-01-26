import { Request, Response } from 'express';
import { createUserService, findAllUsersService } from '../services';

// fetch all user from the db
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await findAllUsersService();
    res.status(200).json({ status: 200, success: true, data: [allUsers] });
  } catch (error) {
    if (error instanceof Error) {
      // ✅ TypeScript knows error is Error
      console.log(
        ` 🔴 Error fetching users from the db: 😟 ${error.message} 🔴`,
      );
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log('Unexpected error', error);
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const createdUser = await createUserService(newUser);
    res.status(200).json({ status: 200, success: true, data: [createdUser] });
  } catch (error) {
    if (error instanceof Error) {
      console.log(` 🔴 Error creating user: 😟 ${error.message} 🔴`);
      res
        .status(500)
        .json({ status: 500, success: false, message: `${error.message}` });
    } else {
      console.log('Unexpected error', error);
    }
  }
};

// fetch one user from the db
