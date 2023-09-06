import { Prisma, PrismaClient } from '@prisma/client'
import { Store, NewStore } from '../domain/store'
import { CustomError } from '../Error/CustomError'

export const prisma = new PrismaClient()

const list = async () => {
  const stores = await prisma.store.findMany()
  return stores;
}

const findOne = async (id: number): Promise<Store | null> => {
  const store = await prisma.store.findUnique({ where: { id }})
  return store
}

// const filter = async (id: number, email: string, name: string, limit: number = 20, page: number = 1) => {

//   const stores = await prisma.store.findMany({
//     where: {
//       id,
//       name,
//     },
//     skip: (page -1) * limit,
//     take: limit,
//   })
//   return stores;
  
// }


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


const edit = async (id: number, name: string, urlLogo: string, address: string ):Promise<Store> => {
  try {

    const result = await prisma.store.update
    ({
      where: { id },
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
    throw new CustomError('Provid a valid id.', 404)
  }

}


const remove = async (id: number): Promise<void> => {
  try {
    await prisma.store.delete({
      where: { id },
    })

  } catch (err) {
    throw new CustomError('Provid a valid id.', 404)
}
}


export { list,findOne, create, edit, remove };