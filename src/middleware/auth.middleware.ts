import { Request, Response, NextFunction } from "express";
import { AppError } from "./error.middleware";
import { verifyToken } from "../utils/jwt";
import { users } from "../models/User";

export const userAuth = async (req:Request, res: Response, next: NextFunction) => {
    try {
        // check the request includes authorization header
        const header = req.headers.authorization

        if(!header || !header?.startsWith("Bearer ")){
            next(new AppError(401, "User is not authorized"))
        }

        const token = header?.split(' ')[1];
        //decode the authorization token
        const decoded: any = verifyToken(token)

        //find user according to the decoded token
        const user = await users.findOne({_id: decoded?.id}).select('-password')

        //verify if user exist
        if(!user){
            next(new AppError(401, "User is not authorized"))
        }

        //attach db user to the request header
        req.user = user;
        //move to the next middleware
        next()

    } catch (error) {
        next(new AppError(401, "User is not authorized"))
    }
}