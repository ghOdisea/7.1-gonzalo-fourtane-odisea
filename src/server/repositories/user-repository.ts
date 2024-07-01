import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { userSchema } from '../models/user'
import { SALT_ROUNDS } from '../config/config'
import { type Login } from '../utils/interfaces/Login-I'
import { type Register } from '../utils/interfaces/Register-I'
import { Validation } from '../utils/Validation'
import { type UserSession } from '../utils/interfaces/User-I'

const User = mongoose.model('User', userSchema)

export class UserRepository {
  public username = ' '
  private readonly password = ' '
  private readonly confirmPass = ' '

  // Creación de cuenta
  async create ({ username, password, confirmPass }: Register): Promise< mongoose.Types.ObjectId | undefined > {
    // Validaciones de user y pass ( opcional Zod )
    if (!Validation.username(username)) throw new Error('user validation error')
    if (!Validation.password(password)) throw new Error('pass validation error')
    if (confirmPass !== password) throw new Error('passwords dont match')

    try {
      const repeatedUser = await User.findOne({ username })
      if (repeatedUser !== null) throw new Error('username already exists')

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS) // Encriptado de contrasenya

      // Crear Modelo
      const user = new User({
        username,
        password: hashedPassword
      })

      // Guardado
      user.save()
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

  // Inicio de sesión
  async login ({ username, password }: Login): Promise<UserSession> {
    Validation.username(username)
    Validation.password(password)

    const user = await User.findOne({ username })
    if (user === null) throw new Error('user not found')

    const checkThis = String(user?.password)
    const isValid: boolean = await bcrypt.compare(password, checkThis)

    if (!isValid) throw new Error('password is not valid')

    return {
      id: user._id,
      username: user.username
    }
  }
}
