import { PrismaClient } from '@prisma/client'
import { Store, NewStore } from '../domain/store'
import { CustomError } from '../Error/CustomError'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export const prisma = new PrismaClient()

const list = async (page: number, limit: number, search: string) => {
  const validPage = page > 0 ? page - 1 : 1
  const validLimit = limit > 0 ? limit : 20
  const validSearch =  '%' + search.replace(/\W/g, '') 

  const stores = await prisma.store.findMany({
    where: {
      OR:
        [
          { name:  { startsWith: validSearch, mode: 'insensitive' } },
          { address: { startsWith: validSearch, mode: 'insensitive' } },
          { urlLogo: { startsWith: validSearch, mode: 'insensitive' } },
        ]

    },
    skip: validLimit * (validPage),
    take: validLimit
  })
  return stores;
}

const findOne = async (id: number): Promise<Store | null> => {
  const store = await prisma.store.findUnique({ where: { id }})
  return store
}

const create = async (newStore: NewStore): Promise<Store> => {
  const  { name, urlLogo, address, ownerId } = newStore

  const result = await prisma.store.create( {
    data: {
      name,
      urlLogo,
      address,
      ownerId
    }
  })
 

  return {
    id: result.id,
    name,
    urlLogo,
    address,
    ownerId
  }

  
}


const edit = async (id: number, name: string, urlLogo: string, address: string, ownerId: number ):Promise<Store | undefined> => {
  try {

    const result = await prisma.store.update
    ({
      where: { id, ownerId },
      data: {
        name,
        urlLogo,
        address
      },
      select: {
        id: true,
        name: true,
        urlLogo: true,
        address: true,
        ownerId: true
      }
    })
    return result
  } catch (err) {
    if(err instanceof PrismaClientKnownRequestError){

      throw new CustomError('You must be the owner to delete a store.', 401)
    }
  }

}


const remove = async (id: number, ownerId: number): Promise<void> => {
  try {
    await prisma.store.delete({
      where: {
        id ,
        ownerId ,
      }
    })

  } catch (err) {
    if(err instanceof PrismaClientKnownRequestError){

      throw new CustomError('You must be the owner to delete a store.', 401)
    }
}
}


export { list,findOne, create, edit, remove };