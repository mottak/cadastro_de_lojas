import { Router } from 'express';
import storeController from '../controllers/storeController'
import storeMiddleware from '../middlewares/storeMiddleware'
import auth from '../middlewares/authmiddleware'


const storesRouter = Router();

storesRouter.get('/stores', auth.authUser, storeController.list);
storesRouter.post('/store', auth.authUser, storeMiddleware.validNewStore, storeController.create);
storesRouter.put('/store', auth.authUser, auth.authOwner, storeMiddleware.validEditStore, storeController.edit);
storesRouter.delete('/store/many', auth.authUser, storeController.removeMany);
storesRouter.delete('/store/:id', auth.authUser, auth.authOwner, storeController.remove);


export default storesRouter;