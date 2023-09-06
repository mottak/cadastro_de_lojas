import jwt from 'jsonwebtoken'
import { User } from '../../domain/user'

const SECRET = 'SEGREDO'

export const createToken = (payload: User): string => {

  const token = jwt.sign(payload, SECRET)
  return token

}