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
// import { MessageRepository } from './repositories/message-repository'

const app = express()
const httpServer = http.createServer(app)
const port = PORT
const uri = CONNECTION_STRING_MONGO
const io = new SocketServer(httpServer, {
  cors: {
    origin: 'http://localhost:5173/chat'
  },
  connectionStateRecovery: {}

})

const userRepository = new UserRepository()
// const messageRepository = new MessageRepository()

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')

// Chequeo del token
app.use((req, res, next) => {
  const accessToken: string = req.cookies.access_token
  req.body = { user: null }

  try {
    const data = jwt.verify(accessToken, SECRET_JWT_KEY)
    req.body = data // Verificar el envio en el cuerpo. !!
    console.log(req.body)
  } catch {
  }
  next()
})

mongoose.connect(uri)
  .then(() => {
    console.log('Mongoose dbconnected')
  })
  .catch((err): any => {
    console.log(err.message)
  })

// ############# RUTAS ###############
// Registro de usuario
app.post('/register', (req, res) => {
  const { username, password, confirmPass } = req.body
  console.log(req.body)
  try {
    const id = userRepository.create({ username, password, confirmPass })
    if (id !== undefined) {
      console.log(id)
      res.status(200).send('User created successfully')
    }
  } catch (error: any) {
    res.status(400).send(error.message)
  }
})
// Inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body

  try {
    const user = userRepository.login({ username, password })
    if (user !== undefined) {
      const sessionId = user.then((u) => {
        return u.id
      })
      const userSession = user.then((u) => {
        return u.username
      })
      const accessToken = jwt.sign(
        { id: sessionId, username: userSession },
        SECRET_JWT_KEY,
        {
          expiresIn: '1h'
        })
      res
        .cookie('access_token', accessToken, {
          httpOnly: true, // la cookie solo se puede acceder desde el servidor.
          secure: true, // https only,
          sameSite: 'strict', // solo se puede acceder desde el mismo dominio
          maxAge: 1000 * 60 * 60
        })
        .send({ user, accessToken })
    }
  } catch (error) {
    res.status(401).send('login not allowed')
  }
})
//
app.post('/chat/rooms/:name', (req, res) => {
  let roomName = req.params.name
  if (roomName === '') {
    roomName = 'general'
  }

  res.status(200).json({ message: ' home chat healthy ' })
})
// Cierre de sesión
app.post('/logout', (req, res) => {
  res
    .clearCookie('access_token')
})

// ############ SOCKETS ###############
io.on('connection', socket => {
  console.log('User io connected')

  // unirse al servidor
  socket.on('join server', username => {

  })

  // envio de mensajes
  socket.on('new message', (msg) => {
    socket.broadcast.emit('new message', { body: msg.body, user: msg.user })
    // const message = this.messageRepository.sendMessage({ messageContent: msg.body, username: msg.user })
    // console.log(message)
  })

  socket.on('join room', async (roomName: string) => {
    // const newRoom = {
    //   room: roomName,
    //   socketId: socket.id
    // }

    // Cuando se conecte, recibe lo que se envia en el socket ( un cuerpo y un usuario ), y lo transmite a todos los usuarios.
    await socket.join(roomName)
  })
})

httpServer.listen((port), () => {
  console.log(`Server listening at http://localhost:${port} in ${NODE_ENV} mode`)
  console.log('Press CTRL-C to stop\n')
})

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
