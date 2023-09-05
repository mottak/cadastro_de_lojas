import { Router } from 'express';
import loginController from '../controllers/loginController'
import loginMiddleware from '../middlewares/loginValidate'



const loginRouter = Router();

loginRouter.post('/login',loginMiddleware.validateDataLogin ,loginController.login);


export default loginRouter;