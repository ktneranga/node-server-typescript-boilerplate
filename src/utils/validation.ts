import Joi from "joi";
import { IUser, ICompany, ILocation} from './types'

export const validateUserLogin = (login: {email: string, password: string}) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(36).required()
    })

    return loginSchema.validate(login)
}

export const validateUserRegister = (user:IUser) => {
    const registerSchema = Joi.object<IUser>({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(36).required(),
        active: Joi.boolean()
    })

    return registerSchema.validate(user)
}

export const validateCompanyData = (company:ICompany) => {

    const locationSchema = Joi.object<ILocation>({
        country: Joi.string().min(2).required(),
        city: Joi.string()
    })

    const companySchema = Joi.object<ICompany>({
        name: Joi.string().min(2).required(),
        location: Joi.object(locationSchema).required(),
        companySize: Joi.number().required(),
        email: Joi.string().email().required(),
        about: Joi.string().required().max(250),
        website: Joi.string().required(),
        userId: Joi.any()
    })

    return companySchema.validate(company)
}