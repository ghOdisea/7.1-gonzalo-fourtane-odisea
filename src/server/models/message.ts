import mongoose from 'mongoose'

export const messageSchema = new mongoose.Schema({
  body: {
    type: 'String',
    required: true,
    createdAt: Date
  },
  user: {
    type: 'String',
    required: true
  }
})
