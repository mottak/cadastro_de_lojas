import { Router } from 'express';
import userController from '../controllers/usersController'



const usersRouter = Router();

usersRouter.get('/users', userController.list);


export default usersRouter;