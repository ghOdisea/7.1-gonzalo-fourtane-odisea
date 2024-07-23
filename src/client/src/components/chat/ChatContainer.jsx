import { useEffect } from 'react'
import useConversation from '../../store/useConversation'
import MessageInput from './MessageInput'
import Messages from './Messages'

import '../styles/chat/ChatContainer.css'
import '../styles/chat/bubbleMessage.css'
import '../styles/chat/InputForm.css'

const ChatContainer = () => {

  const {selectedConversation, setSelectedConversation} = useConversation()

  useEffect(() => {
    return() => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div id="chat-container">
      {!selectedConversation? (
        <NoChatSelected />
      ) : (
      <section>
      <header>
        <span>To:</span><span>{selectedConversation.username}</span>
      </header>
      <Messages />
      <MessageInput />
      </section>
      )} 
    </div>
  )
}

export default ChatContainer

const NoChatSelected = () => {
return (
  <div id="nochat-selected">
    <div>
      <p>Welcome to Shat-App!</p>
      <p>Select a conversation to start messaging.</p>
    </div>
  </div>
)
}