import { PrismaClient } from '@prisma/client'
import { NewUser, User, UserWithPassword } from '../domain/user'
import crypto from '../helper/cryptoPrassword'
import { CustomError } from '../Error/CustomError'

export const prisma = new PrismaClient()

const list = async (): Promise<User[]> => {

  const users: User[] = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  })
  return users;
  
}


const create = async (newUser: NewUser): Promise<User> => {
  const  { name, email, password } = newUser

  const hash = await crypto.cryptoPassword(password)

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
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

const edit = async (id: number, name: string, email: string ):Promise<User> => {
  try {

    const result = await prisma.user.update
    ({
      where: { id },
      data: {
        name,
        email
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    return result
  } catch (err) {
    throw new CustomError('Provid a valid id.', 404)
  }

}

const remove = async (id: number): Promise<void> => {
  try {
    await prisma.user.delete({
      where: { id },
    })

  } catch (err) {
    throw new CustomError('Provid a valid id.', 404)
}
}

const login = async (email: string): Promise<UserWithPassword> => {
  const user = await prisma.user.findUnique({ where: { email }})
  if(!user) {
    throw new CustomError('Email not found.', 404)

  }
  return user


}

export  { list, create, findOne, edit, remove, login };

