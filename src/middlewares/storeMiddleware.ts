import { Request, Response, NextFunction } from 'express';
import { editStoreSchema, storeSchema } from '../validators/store'

const validNewStore = (req: Request, res: Response, next: NextFunction) => {
  const { error } = storeSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
 
  next()
}

const validEditStore = (req: Request, res: Response, next: NextFunction) => {
  const { error } = editStoreSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
 
  next()
}

export default { validNewStore, validEditStore }