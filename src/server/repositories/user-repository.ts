import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { userSchema } from '../models/user'
import { SALT_ROUNDS } from '../config/config'
import { type Login } from '../utils/Login-I'
import { Validation } from '../utils/Validation'

const User = mongoose.model('User', userSchema)

export class UserRepository {
  public username = ''
  public password = ''

  async create ({ username, password }: Login): Promise< mongoose.Types.ObjectId | undefined > {
    // Validaciones de user y pass ( opcional Zod )
    if (!Validation.username(username)) throw new Error('user validation error')
    if (!Validation.password(password)) throw new Error('pass validation error')

    try {
      const repeatedUser = await User.findOne({ username })
      if (repeatedUser !== null) throw new Error('username already exists')

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS) // Encriptado

      const user = new User({ // Creacion de usuario
        username,
        password: hashedPassword
      })

      user.save() // Guardado
        .then(result => {
          console.log(result)
          console.log('User ID : ' + String(result._id))
        })
        .catch(err => {
          console.log(err)
          // mongoose.connection.close()
        })
      return user._id
    } catch (e: any) {
      console.log(e.message)
      return undefined
    }
  }

  async login ({ username, password }: Login): Promise<void> {
    Validation.username(username)
    Validation.password(password)

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
