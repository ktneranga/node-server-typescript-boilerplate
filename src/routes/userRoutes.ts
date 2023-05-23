import { Router, Request, Response, NextFunction } from "express";
import { updateUser, getUser, deactivateUser } from "../controllers/userController";
import { userAuth } from "../middleware/auth.middleware";

const router:Router = Router();

router.get('/',userAuth, getUser)
router.put('/',userAuth, updateUser)
router.delete('/',userAuth, deactivateUser)

export default router;