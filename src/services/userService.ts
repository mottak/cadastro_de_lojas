import { Prisma, PrismaClient } from '@prisma/client'
import { NewUser, User, UserWithPassword } from '../domain/user'
import { CustomError } from '../Error/CustomError'

const prisma = new PrismaClient()

const list = async () => {

  const users = await prisma.user.findMany()
  return users;
  
}

const create = async (newUser: NewUser): Promise<User> => {
  const  { name, email, password } = newUser
  const result = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })

  return {
    id: result.id,
    name,
    email
  }

  
}

const findOne = async (id: number): Promise<UserWithPassword | null> => {
  const user = await prisma.user.findUnique({ where: { id }})
  return user
}

const edit = async (id: number, name: string ) => {

    const result = await prisma.user.update
    ({
      where: { id },
      data: {
        name
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    console.log('inicio service')
    return result
   

}

const remove = async (id: number) => {
  await prisma.user.delete({
    where: { id },
  })
}

export default  { list, create, findOne, edit, remove };