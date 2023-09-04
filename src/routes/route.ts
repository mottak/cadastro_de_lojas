import { Router } from 'express';
import usersRouter from './usersRoutes';
// import storeRoutes from './storeRoutes'

const routes = Router();


routes.use("/", usersRouter)


export default routes