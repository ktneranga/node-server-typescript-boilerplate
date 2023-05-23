import { Router,  } from "express";
import { userAuth } from "../middleware/auth.middleware";
import { addNewCompany, getCompany, getCompanies, updateCompany} from "../controllers/companyController";

const router:Router = Router();

router.get('/', userAuth, getCompanies)
router.get('/:companyId', userAuth, getCompany)
router.put('/:companyId', userAuth, updateCompany)
router.post('/', userAuth, addNewCompany )

export default router;