import { Server as SocketServer } from 'socket.io'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import http from 'http'

import express, { type Router } from 'express'
import { NODE_ENV, PORT } from './config/config'

export class ServerBootStrap {
  public app = express()
  public httpServer = http.createServer(this.app)
  public io = new SocketServer(this.httpServer, {
    cors: {
      origin: '*'
    }
  })

  public port = PORT

  build (): void {
    // Middlewares
    this.app.use(express.json())
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.disable('x-powered-by')
    // Socket connection
    this.io.on('connection', socket => {
      socket.on('message', (msg) => {
        socket.broadcast.emit('message', { body: msg.body, user: msg.user })
        console.log('socket connected')
      })
    })
    // Cuando se conecte, recibe lo que se envia en el socket ( un cuerpo y un usuario ), y lo transmite a todos los usuarios.

    this.listen()
  }

  router (): Router[] {
    return [
      // Aqui van las rutas
    ]
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
