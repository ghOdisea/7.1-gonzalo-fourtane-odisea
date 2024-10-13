import { useState } from "react"
import useSendMessage from "../../hooks/useSendMessage"
import { Button, Text } from "@chakra-ui/react"

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
          <Text  
          className="sending-input"
          hiddenLabel
          variant="outlined" 
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value) }
          autoComplete="off"
          />
          <Button type="submit" variant="contained" disabled={loading}>Send</Button>
      </form>
    </div>
  )
}

export default MessageInput