import { Server as SocketServer } from 'socket.io'
import http from 'http'
import express from 'express'
import { SocketManager } from './socketManager'

const app = express()
const httpServer = http.createServer(app)

const io = new SocketServer(httpServer, {
  cors: {
    origin: ['http://localhost:5000'], // ##############################
    methods: ['GET', 'POST']
  }
  // connectionStateRecovery: {}

})

const socketManager = new SocketManager()

io.on('connection', (socket) => {
  console.log('A user has connected', socket.id)

  const userId = String(socket.handshake.query.userId)
  console.log('User id: ', userId)
  console.log('Socket id: ', socket.id)
  if (userId !== undefined) {
    socketManager.addUser(userId, socket.id)
  }

  io.emit('getOnlineUsers', socketManager.getOnlineUsers())

  socket.on('disconnect', () => {
    console.log('A user has disconnected', socket.id)

    if (userId !== undefined) socketManager.removeUser(userId)

    io.emit('getOnlineUsers', socketManager.getOnlineUsers())
    console.log('userSocketMap: ', socketManager.getOnlineUsers())
  })
})

export { app, io, httpServer, socketManager }
