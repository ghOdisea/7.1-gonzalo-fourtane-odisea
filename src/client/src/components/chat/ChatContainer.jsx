import '../styles/ChatContainer.css'
import MessageInput from './MessageInput'
import Messages from './Messages'


const ChatContainer = () => {
  return (
    <div id="chat-container">
        <header>
            <span>To:</span><span>Contact Name</span>
        </header>

        <Messages />
        <MessageInput />
    </div>
  )
}

export default ChatContainer