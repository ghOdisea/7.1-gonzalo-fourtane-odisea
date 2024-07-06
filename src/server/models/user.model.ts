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
    required: true,
    minlength: 6
  },
  profilePicture: {
    type: String,
    default: ''
  }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)
