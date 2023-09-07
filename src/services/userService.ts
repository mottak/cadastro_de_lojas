import { PrismaClient } from '@prisma/client'
import { NewUser, User, UserWithPassword } from '../domain/user'
import crypto from '../helper/cryptoPrassword'
import { CustomError } from '../Error/CustomError'

export const prisma = new PrismaClient()

const list = async (page: number, limit: number, search: string): Promise<User[]> => {
  const validPage = page > 0 ? page - 1 : 1
  const validLimit = limit > 0 ? limit : 20
  const validSearch =  '%' + search.replace(/\W/g, '')

  const users = await prisma.user.findMany({
    where: {
      OR:
        [
          { name:  { startsWith: validSearch, mode: 'insensitive' } },
          { email: { startsWith: validSearch, mode: 'insensitive' } },
        ]

    },
    skip: validLimit * (validPage),
    take: validLimit,
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
    console.log(err)
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

