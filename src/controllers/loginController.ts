import { Request, Response } from 'express';
import * as userService from '../services/userService'
import { createToken } from '../validators/jwt/createToken';
import crypto from '../helper/cryptoPrassword'

const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const user = await userService.login(email, password)
  const isLoginValid = await crypto.decryptoPassword(password, user.password)
  if(isLoginValid) {
    const acessToken = createToken({id: user.id, name: user.name, email: user.email})
    return res.status(200).json({ acessToken })
  }

  return res.status(404).json({ message: 'Invalid password.'})

}

export default { login }