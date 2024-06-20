import { ServerBootStrap } from './Server'
import { UserRepository } from './repositories/user-repository'

export const Server = new ServerBootStrap()

Server.build()

const User = new UserRepository()

User.create({ username: 'lola', password: '123456' })
  .then(() => { console.log('user created') })
  .catch((e) => { console.log(e.message) })
