import exp from "constants";
import Joi from "joi";
import { User } from "../db/schemas";
export const validateLoginData = (login: {email: string, password: string}) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).required()
    })

    return loginSchema.validate(login)
}

export const validateUserData = (user: { email: string, password: string, googleId: string, province: string, district: string, sector: string, cell: string, street: string}) => {
    const userInfoSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).required(),
        googleId: Joi.string().required(),
        province: Joi.string().required(),
        district: Joi.string().required(),
        sector: Joi.string().required(),
        cell: Joi.string().required(),
        street: Joi.string().required(),
    })

    return userInfoSchema.validate(user)
}