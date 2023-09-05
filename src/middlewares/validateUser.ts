import { Request, Response, NextFunction } from 'express';
import { userSchema, editNameSchema, editEmailSchema, editPasswordSchema } from '../validators/user'

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

const validEditName = (req: Request, res: Response, next: NextFunction) => {
  const { error } = editNameSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
 
  next()

}

const validEditEmail = (req: Request, res: Response, next: NextFunction) => {
  const { error } = editEmailSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
 
  next()

}

const validEditPassword = (req: Request, res: Response, next: NextFunction) => {
  const { error } = editPasswordSchema.validate(req.body)
  if(error) {
    next({status: 400, message: error.message})
  }
 
  next()

}

export default { validNewUser, idExists, validEditName, validEditEmail, validEditPassword }