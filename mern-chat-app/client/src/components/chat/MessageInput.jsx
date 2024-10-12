import { useState } from "react"
import useSendMessage from "../../hooks/useSendMessage"

const MessageInput = () => {

  const [message, setMessage] = useState('')
  const {loading, sendMessage}= useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!message) return

    await sendMessage(message)
    setMessage('')
  }

  return (
    <div className="chat-input">
      <form id="input-form" onSubmit={handleSubmit}>
          <input 
          className="sending-input"
          type="text" 
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value) }
          />
          <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  )
}

export default MessageInput