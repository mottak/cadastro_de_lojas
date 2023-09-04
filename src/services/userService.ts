import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const list = async () => {

  const users = await prisma.user.findMany()
  
}

const create = async () => {

  
}
const edit = async () => {

  
}

const remove = async () => {

  
}

export default  { list, create, edit, remove };