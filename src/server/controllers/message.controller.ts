/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type Response } from 'express'
import { type CustomRequest } from '../middleware/protectRoute'
import { Conversation } from '../models/conversation.model'
import { Message } from '../models/message.model'

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { msgContent } = req.body
    const { receiverId } = req.params
    const senderId = req.userId

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })

    if (conversation === undefined) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      msgContent
    })

    if (newMessage !== undefined) {
      conversation?.messages.push(newMessage._id)
    }

    res.status(201).json(newMessage)
  } catch (error) {
    console.log('Error in sendMessage Controller')
    res.status(500).json({ error: 'Internal server error' })
  }
}
