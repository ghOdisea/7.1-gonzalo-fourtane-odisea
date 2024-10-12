/* eslint-disable @typescript-eslint/no-unsafe-argument */
import mongoose from 'mongoose'
import { compareValue, hashValue } from '../utils/bcrypt'

export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  username: string
  password: string
  profilePicture: string
  createdAt: Date
  updatedAt: Date
  comparePassword: (val: string) => Promise<boolean>
  omitPassword: () => Pick<
  UserDocument, '_id' | 'profilePicture' | 'createdAt' | 'updatedAt' | '__v'>
}

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    profilePicture: {
      type: String,
      default: '#'
    }
  },
  { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next(); return
  }

  this.password = await hashValue(this.password)
  next()
})

userSchema.methods.comparePassword = async function (val: string) {
  return await compareValue(val, this.password)
}

userSchema.methods.omitPassword = function () {
  const user = this.toObject()
  delete user.password
  return user
}

const User = mongoose.model<UserDocument>('User', userSchema)
export default User
