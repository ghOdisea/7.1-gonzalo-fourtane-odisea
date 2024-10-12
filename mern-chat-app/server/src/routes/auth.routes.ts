/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { login, logout, register } from '../controllers/auth.controller'
import { OK } from '../constants/http'

const authRoutes = express.Router()

// Healt
authRoutes.get('/health', (_, res) => {
  res.status(OK).json({ message: 'Auth routes OK' })
})
// Registro de usuario
authRoutes.post('/register', register)

// Inicio de sesión
authRoutes.post('/login', login)

// cierre de sesión - clear cookies
authRoutes.post('/logout', logout)

export default authRoutes
