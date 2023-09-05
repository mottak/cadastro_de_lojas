import { Request, Response } from 'express';
import userService from '../services/userService'

const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const user = await userService.login(email, password)
  if(user) {
    return res.status(200).json({ message: 'Sucessfully logged in.'})
  }

  return res.status(404).json({ message: 'Inavlid password.'})

}

export default {login}