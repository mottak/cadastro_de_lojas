import { Router } from 'express';
import userController from '../controllers/usersController'
import usermiddleware from '../middlewares/validateUser'



const usersRouter = Router();

usersRouter.get('/users',userController.list);
usersRouter.post('/user', usermiddleware.validNewUser, userController.create);


export default usersRouter;