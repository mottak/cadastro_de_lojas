import { Router } from 'express';
import userController from '../controllers/usersController'
import usermiddleware from '../middlewares/validateUser'
import auth from '../middlewares/authmiddleware'



const usersRouter = Router();

usersRouter.get('/users', userController.list);
usersRouter.post('/user', usermiddleware.validNewUser, userController.create);

usersRouter.put('/user/:id', auth.authUser, auth.authValidUser, usermiddleware.idExists, usermiddleware.validEdit, userController.edit);

usersRouter.delete('/user/:id', auth.authUser, auth.authValidUser, userController.remove);


export default usersRouter;