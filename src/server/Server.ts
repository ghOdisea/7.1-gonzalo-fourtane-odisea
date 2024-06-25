import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

import mongoose from 'mongoose'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

import { CONNECTION_STRING_MONGO, NODE_ENV, PORT, SECRET_JWT_KEY } from './config/config'
import { UserRepository } from './repositories/user-repository'

// Chequeo del token

export class ServerBootStrap {
  public app = express()
  public httpServer = http.createServer(this.app)
  public userRepository = new UserRepository()
  public mongoose = mongoose
  public uri = CONNECTION_STRING_MONGO
  public io = new SocketServer(this.httpServer, {
    cors: {
      origin: 'http://localhots:5173'
    }
  })

  public port = PORT

  build (): void {
    // Middlewares
    this.app.use(express.json())
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(cookieParser())
    this.app.use(morgan('dev'))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.disable('x-powered-by')
    this.sockets()

    this.app.use((req, res, next) => {
      const token: string = req.cookies.access_token
      req.body = { user: null }

      try {
        const data = jwt.verify(token, SECRET_JWT_KEY)
        req.body.user = data // Verificar si se envia en el cuerpo o en otro lado.
      } catch {

      }
      next()
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
    // Home page
    // this.app.get('/', (req, res) => {
    //   const { user } = req.session
    //   res.render('index', user)
    // })
    // Registro de usuario
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
    // Inicio de sesión
    this.app.post('/login', (req, res) => {

    })
    // Sala de chat principal - protected
    this.app.get('/chat-home', (req, res) => {

    })
  }

  sockets (): void {
  // Devolver un server de socket para hacer la conexion en el build?
  // ioConnections (): SocketServer {
  //   return
  // }

    this.io.on('connection', socket => {
      socket.on('message', (msg) => {
        socket.broadcast.emit('message', { body: msg.body, user: msg.user })
        console.log('Socket io connected')
      })
    // Cuando se conecte, recibe lo que se envia en el socket ( un cuerpo y un usuario ), y lo transmite a todos los usuarios.
    })
  }

  public listen (): void {
    this.httpServer.listen((this.port), () => {
      console.log(`Server listening at http://localhost:${this.port} in ${NODE_ENV} mode`)
      console.log('Press CTRL-C to stop\n')
    })
  }
}

/*
type Rooms = {
  [key: string]: string[];
};

const rooms: Rooms = {
  'backend-coffee': [],
  'off-topic': [],
};

interface CustomSocket extends Socket {
  room?: string;
  userName?: string;
}

io.on('connection', (socket: CustomSocket) => {
  console.log('Usuario conectado');

  socket.on('getPreviousMessages', async (roomName) => {
    try {
      const messages = await Message.find({ roomName });
      socket.emit('previousMessages', messages);
    } catch (error) {
      console.error('Error al obtener los mensajes anteriores:', error);
    }
  });

  socket.on('connect', () => {
    const roomName = socket.room;
    if (roomName) {
      Message.find({})
        .then((messages) => {
          socket.emit('previousMessages', messages);
        })
        .catch((error) => {
          console.error('Error al obtener los mensajes anteriores:', error);
        });
    }
  });

  socket.on('message', async (msg, roomName) => {
    console.log(`Mensaje recibido: ${msg}`);

    try {
      const message = new Message({
        content: msg,
        userName: socket.userName!,
        roomName: roomName,
      });
      await message.save();
      console.log('Mensaje guardado en la base de datos');

      socket.to(socket.room!).emit('message', message);
    } catch (error) {
      console.error('Error al guardar el mensaje en la base de datos:', error);
    }
  });

  socket.on('createRoom', (roomName: string) => {
    if (!rooms[roomName]) {
      rooms[roomName] = [];
      socket.join(roomName);
      socket.room = roomName;
      socket.emit('createRoom', roomName);
    } else {
      socket.emit('error', 'La sala ya existe');
    }
  });

  socket.on('joinRoom', (roomName: string, userName: string) => {
    socket.join(roomName);
    socket.room = roomName;
    socket.userName = userName;

    rooms[roomName].push(userName);

    const usersInRoom = rooms[roomName];
    console.log(`Usuarios en la sala ${roomName}:`, usersInRoom);

    io.to(roomName).emit('usersList', usersInRoom);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');

    const roomName = socket.room;
    const userName = socket.userName;

    if (roomName && rooms[roomName] && rooms[roomName].includes(userName!)) {
      rooms[roomName] = rooms[roomName].filter((user) => user !== userName);

      io.to(roomName).emit('usersList', rooms[roomName]);
      console.log(
        `Usuarios en la sala ${roomName} después de la desconexión:`,
        rooms[roomName]
      );
    }
  });
});
*/
