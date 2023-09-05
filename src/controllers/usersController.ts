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
  const userexists = await userService.findOne(parseInt(id))
  if (userexists) {
    const editedUser = await userService.edit(parseInt(id), req.body.name)
    return res.status(200).json(editedUser)  
  }
  return res.status(404).json({ message: 'Provide a valid id'})
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  const userexists = await userService.findOne(parseInt(id))
  if (userexists) {
    await userService.remove(parseInt(id))
    return res.status(204).send()
  }
  return res.status(404).json({ message: 'Provide a valid id'})
  
}

export default  { list, create, edit, remove };