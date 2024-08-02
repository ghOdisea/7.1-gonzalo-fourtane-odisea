import type mongoose from 'mongoose'

export interface SocketMapI {
  receiverId: mongoose.Types.ObjectId
}

export type SocketMapping = Record<string, string>
