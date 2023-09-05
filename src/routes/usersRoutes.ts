import { Router } from 'express';
import userController from '../controllers/usersController'
import usermiddleware from '../middlewares/validateUser'



const usersRouter = Router();

usersRouter.get('/users',userController.list);
usersRouter.post('/user', usermiddleware.validNewUser, userController.create);
usersRouter.put('/user/:id', usermiddleware.idExists, usermiddleware.validEditeUser, userController.edit);
usersRouter.delete('/user/:id', userController.remove);


export default usersRouter;