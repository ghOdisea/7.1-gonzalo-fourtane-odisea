import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { userSchema } from '../models/user'
import { SALT_ROUNDS } from '../config/config'
// import Validation from './validation.js'

const User = mongoose.model('User', userSchema)

export interface Login {
  username: string
  password: string
}

export class UserRepository {
  public username = ''
  public password = ''

  async create ({ username, password }: Login): Promise<void> {
    // Validaciones de username ( opcional Zod )
    // Validation.username(username)
    // Validation.password(password)
    // Asegurarse que el usuario no existe!

    try {
      // const repeatedUser = await User.findOne({ username })
      // if (repeatedUser !== null) throw new Error('username already exists')

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

      const user = new User({
        username,
        password: hashedPassword
      })
      user.save()
        .then(result => {
          console.log(result)
          console.log('User ID : ' + result._id)
          mongoose.connection.close()
        })
        .catch(err => {
          console.log(err)
        })
    } catch (e: any) {
      console.log(e.message)
    }
  }

  async login ({ username, password }: Login): Promise<void> {
    // Validation.username(username)
    // Validation.password(password)

    const userExists = await User.findOne({ username })
    if (userExists === undefined) throw new Error('user not found')
    const checkThis = String(userExists?.password)

    const isValid: boolean = await bcrypt.compare(password, checkThis)
    if (!isValid) throw new Error('password is not valid')

    // return {
    //   id: user._id,
    //   username: user.username
    // }
  }
}
