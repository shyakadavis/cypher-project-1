import Joi from 'joi';
import { IUser } from '../../interfaces';

// update to what Fabrice did.
// because of typescript and how we cannot just assign 'any' to 'object' schema, I edited this so that we can export schemas and pass them as params to the validation middleware.
// there is also the added benefit that we can specify right here whether this is being created, or updated, and enforce rules each of each.
export const UserSchema = {
  user: {
    create: Joi.object<IUser>({
      surName: Joi.string().required(),
      givenName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        .required()
        .messages({
          'string.pattern.base':
            'Password should be at least 8 characters long, contain at least 1 uppercase, 1 lowercase, 1 digit, and one special case character.',
          'string.empty': 'Password cannot be empty',
          'any.required': 'Password is required',
        }),
      googleId: Joi.string(),
      province: Joi.string().required(),
      district: Joi.string().required(),
      sector: Joi.string().required(),
      cell: Joi.string().required(),
      street: Joi.string().required(),
    }),
    // here in update, per the guidelines Didas shared, only the billing address can bee updated.
    update: Joi.object<IUser>({
      province: Joi.string().required(),
      district: Joi.string().required(),
      sector: Joi.string().required(),
      cell: Joi.string().required(),
      street: Joi.string().required(),
    }),
  },

  // any other schemas we want can be added here in a similar fashion.
  loginData: {
    create: Joi.object<IUser>({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};
