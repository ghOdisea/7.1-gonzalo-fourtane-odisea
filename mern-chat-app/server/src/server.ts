/* eslint-disable @typescript-eslint/no-misused-promises */
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'

import mongoose from 'mongoose'

import { app, httpServer } from './socket/socket'
import { protectRoute } from './middleware/protectRoute'
import { DB_URI_MONGO, NODE_ENV, SERVER_PORT, VITE_HOST_URL } from './constants/env'
import authRoutes from './routes/auth.routes'
import messageRoutes from './routes/message.routes'
import userRoutes from './routes/user.routes'

// Environment
const corsOptions = {
  origin: VITE_HOST_URL,
  credentials: true
}

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')
app.use(cors(corsOptions))

// Auth routes
app.use('/api/auth', authRoutes)

// Protected routes
app.use('/api/users', protectRoute, userRoutes)
app.use('/api/messages', protectRoute, messageRoutes)

httpServer.listen((SERVER_PORT), () => {
  console.log(`Server listening at http://localhost:${SERVER_PORT} in ${NODE_ENV} mode`)
  console.log('Press CTRL-C to stop\n')
})

// Db connection
mongoose.connect(DB_URI_MONGO)
  .then(() => {
    console.log('Mongoose dbconnected')
  })
  .catch((err): any => {
    console.log(err.message)
  })

// SOCKET

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
