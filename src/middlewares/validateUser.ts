import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../validators/user'

const validNewUser = async(req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
    
  
  next()
}

const valideditwUser = async(req: Request, res: Response, next: NextFunction) => {

}

export default { validNewUser, valideditwUser }