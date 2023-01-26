import Joi from 'joi';
import { IUser } from '../interfaces';
export const validateLoginData = (login: {
  email: string;
  password: string;
}) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(
        /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
      )
      .required(),
  });

  return loginSchema.validate(login);
};

export const validateUserData = (user: IUser) => {
  const userInfoSchema = Joi.object<IUser>({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(
        /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
      )
      .required(),
    googleId: Joi.string(),
    province: Joi.string().required(),
    district: Joi.string().required(),
    sector: Joi.string().required(),
    cell: Joi.string().required(),
    street: Joi.string().required(),
    surName: Joi.string().required(),
    givenName: Joi.string().required(),
  });

  return userInfoSchema.validate(user);
};
