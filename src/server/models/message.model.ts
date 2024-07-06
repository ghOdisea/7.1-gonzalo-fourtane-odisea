import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  msgContent: {
    type: 'String',
    required: true,
    createdAt: Date
  }
}, { timestamps: true })

export const Message = mongoose.model('Message', messageSchema)
