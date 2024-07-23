import { useEffect, useRef } from "react"
import useGetMessages from "../../hooks/useGetMessages"
import Message from "./Message"

const Messages = () => {

  const {messages, loading} = useGetMessages()
  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
    }, 100);
  },[messages])


  return (
    <div id="messages-container">
{/* Conversacion con mensajes */}
      {!loading && 
      messages.length > 0 && 
      messages.map((message) => (
        <div  key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}

{/* Conversacion sin mensajes */}
       {!loading && messages.length === 0 && (
         <p>Send a message to start a conversation</p>
        )}
    </div>
  )
}

export default Messages
