/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type Response } from 'express'
import { Conversation } from '../models/conversation.model'
import { Message } from '../models/message.model'
import { io, socketManager } from '../socket/socket'

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

    res.status(201).json(newMessage)
  } catch (error) {
    console.log('Error in sendMessage Controller')
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
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
    }).populate('messages')
    // No trae los Ids, sino que muestra un objeto con los mensajes.

    if (conversation === null || conversation === undefined) {
      return res.status(200).json([])
    }
    const messages = conversation.messages

    res.status(200).json(messages)
    //
  } catch (error) {
    console.error('Error in sendMessage Controller')
    res.status(500).json({ error: 'Internal server error' })
  }
}
