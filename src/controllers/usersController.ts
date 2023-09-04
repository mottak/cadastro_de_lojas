import { Request, Response } from 'express';
import userService from '../services/userService'


const list = async (req: Request, res: Response) => {

  const users = await userService.list()

  return res.status(200).json(users)
  
}

const create = async (req: Request, res: Response) => {

  
}
const edit = async (req: Request, res: Response) => {

  
}

const remove = async (req: Request, res: Response) => {

  
}

export default  { list, create, edit, remove };