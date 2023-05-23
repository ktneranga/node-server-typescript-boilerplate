// require('dotenv').config({path:'../../.env'})
// console.log(process.env.DB_URI)

import {connect} from 'mongoose'
import dotenv from 'dotenv'
import { AppError } from '../middleware/error.middleware'
dotenv.config({path: "../../.env"})

const connectDB = async() => {
    try {
        const conn = await connect(process.env.DB_URI as string)
        console.log(`Mongodb connected ${conn.connection.host}`);
    } catch (error) {
        throw new AppError(500, 'There is something wrong')
    }
}

export default connectDB;