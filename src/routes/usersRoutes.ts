import { Router } from 'express';
import userController from '../controllers/usersController'
import usermiddleware from '../middlewares/validateUser'
import auth from '../middlewares/authmiddleware'



const usersRouter = Router();

usersRouter.get('/users',userController.list);
usersRouter.post('/user', usermiddleware.validNewUser, userController.create);

usersRouter.put('/user/name/:id', auth.authUser, usermiddleware.idExists, usermiddleware.validEditName, userController.editName);
usersRouter.put('/user/email/:id', auth.authUser, usermiddleware.idExists, usermiddleware.validEditEmail, userController.editEmail);
usersRouter.put('/user/password/:id', auth.authUser, usermiddleware.idExists, usermiddleware.validEditPassword, auth.authUser, userController.editPassword);

usersRouter.delete('/user/:id', userController.remove);


export default usersRouter;