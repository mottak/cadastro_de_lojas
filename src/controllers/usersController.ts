import { Request, Response } from 'express';
import userService from '../services/userService'

const list = async (req: Request, res: Response) => {

  const users = await userService.list()

  return res.status(200).json(users)
  
}

const create = async (req: Request, res: Response) => {   
  const newUser = await userService.create(req.body)
  return res.status(201).json(newUser)

}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params
  const editedUser = await userService.edit(parseInt(id), req.body.name)
  return res.status(200).json(editedUser)  

}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  await userService.remove(parseInt(id))
  return res.status(204).send()

}

export default  { list, create, edit, remove };