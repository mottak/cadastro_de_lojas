import { Request, Response } from 'express';
import * as storesService from '../services/storesService'
import * as userService from '../services/userService'
import { CustomError } from '../Error/CustomError';

const list = async (req: Request, res: Response) => {
  const page = Number(req?.query?.page) || 1
  const limit = Number(req?.query?.limit) || 20
  const search = req?.query?.search as string || ''

  const stores = await storesService.list(page, limit, search)

  return res.status(200).json(stores)
  
}

const create = async (req: Request, res: Response) => {
  const { name, urlLogo, address } = req.body
  const user = res.locals.user

  const newStore = await storesService.create({name, urlLogo, address, ownerId: user.id})
  return res.status(201).json(newStore)

}

const edit = async (req: Request, res: Response) => {
  const { name, urlLogo, address } = req.body
  const { id } = req.params
  const user = res.locals.user
  
  if (!user?.id) {
    throw new CustomError('You must login to edit this store.', 401)
  }

  const editedStore = await storesService.edit(Number(id), name, urlLogo, address, user.id)
  return res.status(200).json(editedStore)

}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = res.locals.user
  
  if (!user.id) {
    throw new CustomError('You must be a owner to delete this store.', 401)
  }

  await storesService.remove(Number(id), user.id)

  return res.status(204).json()
  
}
const removeMany = async (req: Request, res: Response) => {

  await storesService.removeMany()

  return res.status(204).json({ message: 'All stores have been removed.' })
  
}


export default  { list, create, edit, remove, removeMany };