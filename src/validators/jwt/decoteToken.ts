import jwt from 'jsonwebtoken'
import { User } from '../../domain/user';
import { CustomError } from '../../Error/CustomError';

const SECRET = 'SEGREDO'

export const decodeToken = (token: string): User =>{
  try {
    const decoded = jwt.verify(token, SECRET);
    const payloadUser = JSON.parse(decoded as string)
    return payloadUser;
  } catch (error) {
    throw new CustomError('Invalid Token.', 401);
  }
}