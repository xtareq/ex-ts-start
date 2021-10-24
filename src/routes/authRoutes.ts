
import {Router} from 'express'
import { AuthController } from '../controllers/AuthController'

// initialize Controller 
const authController = new AuthController();


//initialize router
const router = Router()

router.post("/register", authController.register)
router.post("/verify", authController.verify)
router.post("/login", authController.login)





export default router