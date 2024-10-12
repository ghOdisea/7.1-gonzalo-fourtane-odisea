/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller'

const messageRoutes = express.Router()

messageRoutes.get('/health', (_, res) => {
  res.status(200).json({ message: 'Message routes OK' })
})
messageRoutes.get('/:id', getMessages)
messageRoutes.post('/send/:id', sendMessage)

export default messageRoutes
