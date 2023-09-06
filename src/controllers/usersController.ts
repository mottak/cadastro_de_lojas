import { Request, Response } from 'express';
import * as userService from '../services/userService'

const list = async (req: Request, res: Response) => {
  
  const page = Number(req?.query?.page) || 1
  const limit = Number(req?.query?.limit) || 20
  const search = req?.query?.search as string || ''

  const users = await userService.list(page, limit, search)
  
  return res.status(200).json(users)
  
}

const create = async (req: Request, res: Response) => {   
  const newUser = await userService.create(req.body)
  return res.status(201).json(newUser)

}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, email } = req.params

  const editedUser = await userService.edit(parseInt(id), name, email)
  return res.status(200).json(editedUser)  

}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  await userService.remove(parseInt(id))
  return res.status(204).json()

}

export default  { list, create, edit, remove };