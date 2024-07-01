import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({ // crear esquema de mongo
  username: {
    type: String,
    unique: true,
    required: true,
    createdAt: Date
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})
