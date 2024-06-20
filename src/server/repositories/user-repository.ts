import bcrypt from 'bcrypt'
// import DBLocal from 'db-local'
import { SALT_ROUNDS } from '../config/config'
import crypto from 'node:crypto'
// import Validation from './validation.js'

// const { Schema } = new DBLocal({ path: './db' })             aca va la base de datos...

const User = Schema('User', { // crear esquema de mongo
//   _id: { type: String, required: true },
//   username: { type: String, required: true },
//   password: { type: String, required: true }
})

export class UserRepository {
  public username: string
  public password: string

  constructor (username: string, password: string) {
    this.username = username
    this.password = password
  }

  async create ({ username, password }): string | null {
    // Validaciones de username ( opcional Zod )
    // Validation.username(username)
    // Validation.password(password)

    // Asegurarse que el usuario no existe!
    const user: boolean = User.findOne({ username })
    if (user) throw new Error('username already exists')

    // Creacion de id y encriptacion de password
    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  async login ({ username, password }) {
    // Validation.username(username)
    // Validation.password(password)

    const user: boolean = User.findOne({ username })
    if (!user) throw new Error('user not found')

    const isValid: boolean = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('password is not valid')

    return {
      id: user._id,
      username: user.username
    }
  }
}
