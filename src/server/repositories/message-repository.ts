import mongoose from 'mongoose'
import { messageSchema } from '../models/message'
import { type Chat } from '../utils/interfaces/Chat-I'

const Message = mongoose.model('Message', messageSchema)

export class MessageRepository {
  public body = ''
  public user = ''

  async sendMessage ({ body, user }: Chat): Promise< void > {
    if (typeof body === 'string') {
      const message = new Message({ body, user })

      message.save()
        .then(result => {
          console.log('msg:' + String(result))
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
