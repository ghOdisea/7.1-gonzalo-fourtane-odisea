import { Server as SocketServer } from 'socket.io'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import http from 'http'
import mongoose from 'mongoose'
import { CONNECTION_STRING_MONGO, NODE_ENV, PORT } from './config/config'

import express from 'express'
import { UserRepository } from './repositories/user-repository'

export class ServerBootStrap {
  public app = express()
  public httpServer = http.createServer(this.app)
  public io = new SocketServer(this.httpServer, {
    cors: {
      origin: 'http://localhots:5173'
    }
  })

  public userRepository = new UserRepository()
  public mongoose = mongoose
  public uri = CONNECTION_STRING_MONGO

  public port = PORT

  build (): void {
    // Middlewares
    this.app.use(express.json())
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.disable('x-powered-by')
    // Cuando se conecte, recibe lo que se envia en el socket ( un cuerpo y un usuario ), y lo transmite a todos los usuarios.
    this.io.on('connection', socket => {
      socket.on('message', (msg) => {
        socket.broadcast.emit('message', { body: msg.body, user: msg.user })
        console.log('Socket io connected')
      })
    })
    this.mongoose.connect(this.uri)
      .then(() => {
        console.log('Mongoose dbconnected')
      })
      .catch(error => {
        console.log(error.message)
      })

    this.listen()
  }

  routes (): void {
    this.app.post('/register', (req, res) => {
      const { username, password } = req.body
      console.log(req.body)
      try {
        const id = this.userRepository.create({ username, password })
        res.send({ id })
      } catch (error: any) {
        res.status(400).send(error.message)
      }
    })
  }
  // Devolver un server de socket para hacer la conexion en el build?
  // ioConnections (): SocketServer {
  //   return
  // }

  public listen (): void {
    this.httpServer.listen((this.port), () => {
      console.log(`Server listening at http://localhost:${this.port} in ${NODE_ENV} mode`)
      console.log('Press CTRL-C to stop\n')
    })
  }
}
