
import {Router} from 'express'
import { AccountController } from '../controllers/AccountController'
import { Authenticate } from '../middlewares/Authenticate';


// initialize Controller 
const accountController = new AccountController();


//initialize router
const router = Router()

router.use(Authenticate)

router.get("/profile", accountController.getProfile)





export default router