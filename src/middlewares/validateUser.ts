import { Request, Response, NextFunction } from 'express';
import { userSchema, editUserSchema } from '../validators/user'

const validNewUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
 
  next()
}

const idExists = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  if(!id) {
    next({status: 404, message: 'It\s necessary  to inform an id'})
  }
  next()
}

const validEdit = (req: Request, res: Response, next: NextFunction) => {
  const { error } = editUserSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
 
  next()

}

export default { validNewUser, idExists, validEdit }