import bcrypt from 'bcrypt'
import { CustomError } from '../Error/CustomError'

const salt = 10

const cryptoPassword = async(password: string) => {
  try {
    const hash = await bcrypt.hash(password, salt)
    return  hash as string

  } catch (e) {
    throw new CustomError('Something went wrong.', 400)
  }


}

const decryptoPassword = async (insertedPassword: string, hashPassword: string): Promise<boolean> => {
  const match = await bcrypt.compare(insertedPassword, hashPassword)

  return match
}

export default { cryptoPassword, decryptoPassword
}