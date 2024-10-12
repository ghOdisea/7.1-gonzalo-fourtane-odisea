/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type Response } from 'express'
import { Conversation } from '../models/conversation.model'
import { Message } from '../models/message.model'
import { io, socketManager } from '../socket/socket'
import { CONFLICT, CREATED, OK } from '../constants/http'

export const sendMessage = async (req: any, res: Response) => {
  try {
    // Recibo cuerpo del mensaje por input,
    const { msgContent } = req.body
    const { id: receiverId } = req.params
    const sender = req.user
    const senderId = sender._id

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })

    if (conversation === null) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      msgContent
    })

    if (newMessage !== null) {
      conversation?.messages.push(newMessage._id)
    }

    // await conversation.save()
    // await newMessage.save()
    await Promise.all([conversation.save(), newMessage.save()])

    // SOCKET IO FUNCTIONALITY HERE

    const receiverSocketId = socketManager.getOnlineUser(receiverId)

    if (receiverSocketId !== undefined) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    res.status(CREATED).json(newMessage)
  } catch (error) {
    res.status(CONFLICT).json({ error: 'Conflict in sendMessage Controller' })
  }
}

export const getMessages = async (req: any, res: Response) => {
  try {
    // Get IDs
    const { id: userToChatId } = req.params
    const sender = req.user
    const senderId = sender._id

    // Get Conversation between both if exists
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate('messages') // No trae los Ids, sino que muestra un objeto con los mensajes.

    if (conversation === null) {
      return res.status(OK).json([])
    }
    const messages = conversation.messages

    res.status(OK).json(messages)
  } catch (error) {
    console.error('Error in get Messages Controller')
    res.status(CONFLICT).json({ error: 'Internal server error' })
  }
}
