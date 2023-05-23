import express, {Request, Response} from 'express'
import todoRouter from './src/routes/todoRoutes';
import authRoutes from './src/routes/authRoutes';
import userRoutes from './src/routes/userRoutes';
import companyRoutes from './src/routes/companyRoutes';
import errorHandler, { AppError } from './src/middleware/error.middleware';
import connectDB from './src/database/db';
import { users } from './src/models/User';
import { userAuth } from './src/middleware/auth.middleware';
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const app = express()

const PORT:number = 5000;

connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req:Request, res:Response)=>{
    // throw new AppError(404, "Error handler")
    let obj: any = {}
    obj.functionDoesNotExist()
    return res.status(200).json({
        data: "Server is running"
    })
})

app.get('/home',userAuth, (req:Request, res: Response)=>{
    return res.json({
        data: "This is home"
    })
})

app.use('/api/todos', todoRouter)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/company', companyRoutes)

//error handling should be gone hvere, bottom of the program
app.use(errorHandler)

app.listen(PORT, ()=>console.log("Server is runnig on port ", PORT))