import { Prisma, PrismaClient } from '@prisma/client'
import { Store, NewStore } from '../domain/store'
import { CustomError } from '../Error/CustomError'

const prisma = new PrismaClient()

const list = async () => {

  const stores = await prisma.store.findMany()
  return stores;
  
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

// const findOne = async (id: number): Promise<UserWithPassword | null> => {
//   const user = await prisma.user.findUnique({ where: { id }})
//   return user
// }

// const editName = async (id: number, name: string ):Promise<User> => {
//   try {

//     const result = await prisma.user.update
//     ({
//       where: { id },
//       data: {
//         name
//       },
//       select: {
//         id: true,
//         name: true,
//         email: true
//       }
//     })
//     return result
//   } catch (err) {
//     throw new CustomError('Provid a valid id.', 404)
//   }

// }

// const editEmail = async (id: number, email: string ):Promise<User> => {
//   try {

//     const result = await prisma.user.update
//     ({
//       where: { id },
//       data: {
//         email
//       },
//       select: {
//         id: true,
//         name: true,
//         email: true
//       }
//     })
//     return result
//   } catch (err) {
//     throw new CustomError('Provid a valid id.', 404)
//   }

// }


const remove = async (id: number): Promise<void> => {
  try {
    await prisma.store.delete({
      where: { id },
    })

  } catch (err) {
    throw new CustomError('Provid a valid id.', 404)
}
}


export default  { list, create, remove };