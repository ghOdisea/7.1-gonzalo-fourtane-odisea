import type mongoose from 'mongoose'

export interface UserSession {
  id: mongoose.Types.ObjectId
  username: string
}
