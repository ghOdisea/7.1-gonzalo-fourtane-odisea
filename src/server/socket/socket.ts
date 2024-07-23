import { Server as SocketServer } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const httpServer = http.createServer(app)

const io = new SocketServer(httpServer, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST']
  },
  connectionStateRecovery: {}

})

io.on('connection', (socket) => {
  console.log('a user has connected', socket.id)

  // Socket.on escucha los eventos, se usa tanto cliente como servidor.
  socket.on('disconnect', () => {
    console.log('a user has disconnected', socket.id)
  })
})

export { app, io, httpServer }
