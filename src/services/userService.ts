import { Prisma, PrismaClient } from '@prisma/client'
import { NewUser, User, UserWithPassword } from '../domain/user'
import crypto from '../helper/cryptoPrassword'
import { CustomError } from '../Error/CustomError'

const prisma = new PrismaClient()

const list = async () => {

  const users = await prisma.user.findMany()
  return users;
  
}


const create = async (newUser: NewUser): Promise<User> => {
  const  { name, email, password } = newUser

  const { hash, salt } = crypto.cryptoPassword(password)

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      salt,
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

const editName = async (id: number, name: string ):Promise<User> => {
  try {

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
    return result
  } catch (err) {
    throw new CustomError('Provid a valid id.', 404)
  }

}

const editEmail = async (id: number, email: string ):Promise<User> => {
  try {

    const result = await prisma.user.update
    ({
      where: { id },
      data: {
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

const editPassword = async (id: number, password: string ): Promise<void> => {
  try {
    const { hash, salt } = crypto.cryptoPassword(password)
    await prisma.user.update
    ({
      where: { id },
      data: {
        password: hash,
        salt
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
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

const login = async (email: string, password: string): Promise<UserWithPassword> => {
  const user = await prisma.user.findUnique({ where: { email }})
  if(!user) {
    throw new CustomError('Email not found.', 404)

  }
  return user


}

export default  { list, create, findOne, editName, editEmail, editPassword, remove, login };