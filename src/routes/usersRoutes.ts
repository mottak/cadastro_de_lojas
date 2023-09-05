import { Router } from 'express';
import userController from '../controllers/usersController'
import usermiddleware from '../middlewares/validateUser'



const usersRouter = Router();

usersRouter.get('/users',userController.list);
usersRouter.post('/user', usermiddleware.validNewUser, userController.create);

usersRouter.put('/user/name/:id', usermiddleware.idExists, usermiddleware.validEditName, userController.editName);
usersRouter.put('/user/email/:id', usermiddleware.idExists, usermiddleware.validEditEmail, userController.editEmail);
usersRouter.put('/user/password/:id', usermiddleware.idExists, usermiddleware.validEditPassword, userController.editPassword);

usersRouter.delete('/user/:id', userController.remove);


export default usersRouter;