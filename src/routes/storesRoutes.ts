import { Router } from 'express';
import storeController from '../controllers/storeController'
import storeMiddleware from '../middlewares/storeMiddleware'



const storesRouter = Router();

storesRouter.get('/stores', storeController.list);
storesRouter.post('/store', storeMiddleware.validNewStore, storeController.create);

// storesRouter.delete('/store/:id', storeController.remove);


export default storesRouter;