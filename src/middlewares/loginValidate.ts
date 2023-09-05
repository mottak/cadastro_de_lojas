import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../validators/login'

const validateDataLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
 
  next()
}

export default { validateDataLogin }