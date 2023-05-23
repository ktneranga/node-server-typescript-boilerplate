import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

export class AppError extends Error{
    code: number

    constructor(code:number, message:string){
        super()
        this.code = code;
        this.message = message;
        this.stack
    }
}

//errors could be return by us as the dev, so it sould be under the AppError instance
// or error could be any, which is an error not return by us
const errorHandler:ErrorRequestHandler = (error:any | AppError, req:Request, res:Response, next:NextFunction) => {

    const code = error.code || 500;
    const message = error.message;
    const stack = process.env.NODE_ENV === "production" ? "" : error.stack 

    //in an event, if the error is not nthrown from us, give an generic message
    if(!(error instanceof AppError)){
        return res.status(code).json({
            message: "The problem is on our end, we are trying to fixing it",
            success: false,
            data: null,
            stack
        })
    }

    //if the exception is thrown by us
    res.status(code).json({
        message,
        success: false,
        data: null,
        stack
    })

    //extract statuscode
    // const statuscode = res.statusCode || 500
    // const message = error.message || "There is something wrong!"

    // console.log(statuscode, message)

    // res.status(statuscode).json({
    //     message: message,
    //     success: false,
    //     data: null
    // })
}

export default errorHandler;