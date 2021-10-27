
import {Router} from 'express'
import { AuthController } from '../controllers/AuthController'

// initialize Controller 
const authController = new AuthController();


//initialize router
const router = Router()

router.post("/reset-password", authController.resetPassword)
router.post("/check-password-token", authController.checkResetPasswordToken)
router.post("/forget-password", authController.forgetPasswordRequest)
router.post("/register", authController.register)
router.post("/reverify", authController.reVerifyRequest)
router.post("/verify", authController.verify)
router.post("/login", authController.login)





export default router