import { Request, Response, NextFunction } from "express"
import { users } from "../models/User"
import { AppError } from "../middleware/error.middleware"
import bcrypt from 'bcrypt'
import { assignToken } from "../utils/jwt"
import { validateUserLogin, validateUserRegister } from "../utils/validation"

export const registerUser = async(req:Request, res:Response, next:NextFunction) => {
    try {

        const valid = validateUserRegister(req.body)

        if(valid.error){
            throw new AppError(400,"Invalid details")
        }

        const name = req.body?.name;
        const email = req.body?.email;
        const password = req.body?.password;

        const user = await users.findOne({email:email})
        if(user){
            throw new AppError(401,"User already exist!")
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await users.create({
            name,
            email,
            password: hashedPassword
        })

        if(!newUser){
            throw new AppError(400,"User registration failed, try again!")
        }

        const token = assignToken({id: newUser.id})

        return res.status(201).json({
            message: "User successfully registered",
            success: true,
            token: token
        })

    } catch (error) {
        next(error)
    }
}

export const loginUser = async(req:Request, res:Response, next:NextFunction) => {
    try {

        // if(!email || !password){
        //     throw new AppError(400,"Invalid credentials")
        // }
        const valid = validateUserLogin(req.body)
        if(valid.error){
            throw new AppError(400,"Invalid credentials")
        }

        const email = req.body?.email;
        const password = req.body?.password;

        const user = await users.findOne({email: email, active: true})

        if(!user){
            throw new AppError(400, "User doesn't exist")
        }

        const passwordMatched = await bcrypt.compare(password, user.password)

        if(!passwordMatched){
            throw new AppError(400, "Password doesn't matched")
        }

        const token = assignToken({id: user.id})

        return res.status(201).json({
            message: "User loggedin successfully",
            success: true,
            token: token
        })

    } catch (error) {
        next(error)
    }
}

export const getUser = async(req:Request, res:Response, next:NextFunction) => {
    try {
       const {_id, email} = req.user

       const user = await users.findOne({email: email}).select("-password")
        if(!user){
            throw new AppError(401, "User does not exist")
        }

        res.status(200).json({
            message: "User details",
            success: true,
            data: user
        })

    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
       const {_id, email} = req.user;
       const name = req.body.name;

       if(!name){
        throw new AppError(400, "No user details to update")
       }

       const user = await users.findOneAndUpdate({_id, email}, {name:name}, {new: true}).select('name email');
       res.status(200).json({
        message: "User updated successfully",
        success: true,
        data: user
       })

    } catch (error) {
        next(error)
    }
}

export const deactivateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
       const {_id, email} = req.user;
       const user = await users.findOneAndUpdate({_id, email},{active: false}, {new: true}).select('email name active')

        res.status(200).json({
            message: "User deactivated successfully",
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}