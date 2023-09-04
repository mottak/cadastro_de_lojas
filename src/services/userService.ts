import { PrismaClient } from '@prisma/client'
import { NewUser, User } from '../domain/user'

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
const edit = async () => {

  
}

const remove = async () => {

  
}

export default  { list, create, edit, remove };