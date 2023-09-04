import { PrismaClient } from '@prisma/client'
import { NewUser, User } from '../domain/user'
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
const edit = async (id: number, name: string ) => {
  const result = await prisma.user.update({
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

  if (!result) {
    throw new CustomError('User not found', 404)

  }
  return result

  
}

const remove = async () => {

  
}

export default  { list, create, edit, remove };