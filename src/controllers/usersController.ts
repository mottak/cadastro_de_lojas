import { Request, Response } from 'express';
import userService from '../services/userService'
import { userSchema } from '../validators/user';


const list = async (req: Request, res: Response) => {

  const users = await userService.list()

  return res.status(200).json(users)
  
}

const create = async (req: Request, res: Response) => {
  // try {
   
    const newUser = await userService.create(req.body)
    return res.status(201).json(newUser)

  // } catch (err) {
  //   console.log('entrei no catch')
  //   console.log('eroooo -----', err)
  //   throw err
  // }
 




  
}
const edit = async (req: Request, res: Response) => {

  
}

const remove = async (req: Request, res: Response) => {

  
}

export default  { list, create, edit, remove };