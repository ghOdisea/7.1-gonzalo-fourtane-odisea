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
  console.log(
    `Server listening at http://localhost:${SERVER_PORT} in ${NODE_ENV} mode. Press CTRL-C to stop\n`
  )
})

// Db connection
mongoose.connect(DB_URI_MONGO)
  .then(() => {
    console.log('Mongoose dbconnected')
  })
  .catch((err): any => {
    console.log(err.message)
  })
