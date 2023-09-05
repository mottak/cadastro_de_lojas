import { Request, Response, NextFunction } from 'express';
import { storeSchema } from '../validators/store'

const validNewStore = (req: Request, res: Response, next: NextFunction) => {
  const { error } = storeSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
 
  next()
}

export default { validNewStore }