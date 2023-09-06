import { Request, Response } from 'express';
import * as storesService from '../services/storesService'
import * as userService from '../services/userService'

const list = async (req: Request, res: Response) => {
  const page = Number(req?.query?.page) || 1
  const limit = Number(req?.query?.limit) || 20
  const search = req?.query?.search as string || ''

  const stores = await storesService.list(page, limit, search)

  return res.status(200).json(stores)
  
}

const create = async (req: Request, res: Response) => {

  const ownerIdExists = await userService.findOne(req.body.ownerId);

  if (ownerIdExists) {
    const newStore = await storesService.create(req.body)
    return res.status(201).json(newStore)

  }

  return res.status(404).json({ message: 'Inform a valid owner id.'})


}

const edit = async (req: Request, res: Response) => {
  const { name, urlLogo, address } = req.body
  const { id } = req.params

  const editedStore = await storesService.edit(parseInt(id), name, urlLogo, address)
  return res.status(200).json(editedStore)

}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params

   await storesService.remove(parseInt(id))

  return res.status(204).json()
  
}


export default  { list, create, edit, remove };