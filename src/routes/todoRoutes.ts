import { Router, Request, Response } from "express";

const router:Router = Router()

router.get('/', async (req:Request, res:Response)=>{
    return res.status(200).json({
        data: "Return Todos"
    })
})

export default router;