/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getUsersSideBar } from '../controllers/user.controller'

const userRoutes = express.Router()

userRoutes.get('/health', (_, res) => {
  res.status(200).json({ message: 'User routes OK' })
})
userRoutes.get('/', getUsersSideBar)

export default userRoutes
