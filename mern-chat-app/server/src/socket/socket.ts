import { Server as SocketServer } from 'socket.io'
import http from 'http'
import express from 'express'
import { SocketManager } from './socketManager'
import { VITE_CLIENT_PORT } from '../constants/env'

const app = express()
const httpServer = http.createServer(app)

const io = new SocketServer(
  httpServer,
  {
    cors: {
      origin: VITE_CLIENT_PORT,
      methods: ['GET', 'POST']
    },
    connectionStateRecovery: {}
  }
)

const socketManager = new SocketManager()

io.on('connection', (socket) => {
  console.log('A user has connected', socket.id)

  const { userId } = socket.handshake.query
  console.log('User id: ', userId)
  console.log('Socket id: ', socket.id)
  if (userId !== undefined) {
    socketManager.addUser(String(userId), socket.id)
  }

  io.emit('getOnlineUsers', socketManager.getOnlineUsers())

  socket.on('disconnect', () => {
    console.log('A user has disconnected', socket.id)

    if (userId !== undefined) socketManager.removeUser(String(userId))

    io.emit('getOnlineUsers', socketManager.getOnlineUsers())
    console.log('userSocketMap: ', socketManager.getOnlineUsers())
  })
})

export { app, io, httpServer, socketManager }
