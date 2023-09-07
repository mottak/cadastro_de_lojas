import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../../domain/user';
import { CustomError } from '../../Error/CustomError';

const SECRET = 'SEGREDO'

export const decodeToken = (token: string): JwtPayload =>{
  try {
    const decoded = jwt.verify(token, SECRET);
    console.log('decoded ---', decoded)
    // const payloadUser = JSON.parse(decoded as string)
    // console.log('payloadUser ---', payloadUser)
    return decoded as JwtPayload;
  } catch (error) {
    throw new CustomError('Invalid Token.', 401);
  }
}