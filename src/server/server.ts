import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'

import mongoose from 'mongoose'
import http from 'http'
// import { Server as SocketServer } from 'socket.io'

import { CONNECTION_STRING_MONGO, NODE_ENV, PORT } from './config/config'
import authRoutes from './routes/auth.routes'
import messageRoutes from './routes/message.routes'
import userRoutes from './routes/user.routes'

const app = express()
const httpServer = http.createServer(app)
const port = PORT
const uri = CONNECTION_STRING_MONGO
// const io = new SocketServer(httpServer, {
//   cors: {
//     origin: 'http://localhost:5173'
//   },
//   connectionStateRecovery: {}

// })

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  })
)
// Chequeo del token
// app.use((req, res, next) => {
//   const accessToken: string = req.cookies.access_token
//   try {
//     const data = jwt.verify(accessToken, SECRET_JWT_KEY)
//     console.log(data)
//     console.log(req.session.id)
//   } catch {
//   }
//   next()
// })

// RUTAS

// Requerimiento de usuario
// app.get('/', (req, res) => {
//   const { username } = req.session
//   res.send(username)
// })

// SOCKETS

// io.on('connection', (socket) => {
//   console.log('User io connected')

//   socket.on('getPrevious messages', roomName => {
//     try {
//       const messages = Message.find({ roomName })
//       return messages
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   )

//   // socket.on('join server', socket => {
//   //   let roomName = req.body.room
//   //   if (roomName === '') {
//   //     roomName = 'general'
//   //   }
//   //   const messages = Message.find({ roomName })
//   // })

//   // envio de mensajes

//   socket.on('new message', (msg) => {
//     const room = String(msg.room)
//     socket.broadcast.to(room).emit('new message', { body: msg.body, user: msg.user })
//     // const message = this.messageRepository.sendMessage({ messageContent: msg.body, username: msg.user })
//     // console.log(message)
//   })

//   socket.on('join room', async (roomName: string) => {
//     // const newRoom = {
//     //   room: roomName,
//     //   socketId: socket.id
//     // }

//     // Cuando se conecte, recibe lo que se envia en el socket ( un cuerpo y un usuario ), y lo transmite a todos los usuarios.
//     await socket.join(roomName)
//   })

//   socket.on('disconnect', () => {
//     console.log('A user has disconnected')
//   })
// })

httpServer.listen((port), () => {
  console.log(`Server listening at http://localhost:${port} in ${NODE_ENV} mode`)
  console.log('Press CTRL-C to stop\n')
})

// DB connection
mongoose.connect(uri)
  .then(() => {
    console.log('Mongoose dbconnected')
  })
  .catch((err): any => {
    console.log(err.message)
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
