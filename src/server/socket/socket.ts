import { Server as SocketServer } from 'socket.io'
import http from 'http'
import express from 'express'
import { type SocketMapping } from '../utils/interfaces/Sockets-I'

const app = express()
const httpServer = http.createServer(app)

const io = new SocketServer(httpServer, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST']
  },
  connectionStateRecovery: {}

})

export const getReceiverSocketId: any = (receiverId: any) => {
  return userSocketMap[receiverId]
}

const userSocketMap: SocketMapping = {} // {userId: socketId}

io.on('connection', (socket) => {
  console.log('a user has connected', socket.id)

  const userId = String(socket.handshake.query.userId)
  if (userId !== undefined) userSocketMap[userId] = socket.id

  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  console.log('mapa de usuarios online:', userSocketMap)
  // Socket.on escucha los eventos, se usa tanto cliente como servidor.
  socket.on('disconnect', () => {
    console.log('a user has disconnected', socket.id)
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (userId !== undefined) delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { app, io, httpServer }
