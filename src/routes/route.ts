import { Router } from 'express';
import usersRouter from './usersRoutes';
import loginRouter from './loginRoute';
// import storeRoutes from './storeRoutes'

const routes = Router();


routes.use("/", usersRouter, loginRouter)


export default routes