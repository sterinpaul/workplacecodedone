import express from 'express';
import userController from '../controller/userController.js';
  import { uploadUserId } from '../middleware/cloudinaryConfig.js';

const userRouter =()=>{
    const router = express.Router()

     router.post('/paymentandsignup',userController.makePayment)


     router.get('/emailVerification/:email',userController.emailVerification)
     router.post('/saveUserData',uploadUserId,userController.saveUserDataAndTransaction)




    return router;
}
export default userRouter;