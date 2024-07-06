/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { login, logout, register } from '../controllers/auth.controller'

const router = express.Router()

// Registro de usuario
router.post('/register', register)

// Inicio de sesión
router.post('/login', login)

// cierre de sesión - clear cookies
router.post('/logout', logout)

export default router
