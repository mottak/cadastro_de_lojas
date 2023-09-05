import { Router } from 'express';
import usersRouter from './usersRoutes';
import loginRouter from './loginRoute';
import storeRoutes from './storesRoutes'

const routes = Router();


routes.use("/", usersRouter, loginRouter, storeRoutes)


export default routes