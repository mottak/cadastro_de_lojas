import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../validators/jwt/decoteToken'

const authUser = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if(!authorization) {
    next({status: 400, message: 'You need to be logged in.'});
  }
  next()

}

const authValidUser = (req: Request, res: Response, next: NextFunction) => {
  
  const { authorization } = req.headers;
  const { id } = req.params
  const payload = decodeToken(authorization as string)

  if (payload.id !== Number(id)) {
    next({status: 400, message: 'Invalid token.'})
  }
  res.locals.user = payload
  next()
}

export default { authUser, authValidUser }