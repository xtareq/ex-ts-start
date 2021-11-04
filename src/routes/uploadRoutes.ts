
import {Request, Router} from 'express'
import { AccountController } from '../controllers/AccountController'
import { UploadController } from '../controllers/UploadController';
import { Authenticate } from '../middlewares/Authenticate';



// initialize Controller 
const uploadController = new UploadController();


//initialize router
const router = Router()


// upload routes
router.post('/upload',  uploadController.uploadFile)





export default router