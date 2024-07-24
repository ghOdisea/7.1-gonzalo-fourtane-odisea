/* eslint-disable react/prop-types */
import '../styles/sidebar/Conversation.css'
import BadgeAvatar from './BadgeAvatar'
import useConversation from '../../store/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id === conversation._id
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <div id='conversation-container'
    className={isSelected ? 'selectedConversation' : ''} 
    onClick={() => setSelectedConversation(conversation)}
    >
    {/* Aqui va la imagen: */}
    <BadgeAvatar />  
    <div id='contact-container'>
      <p>{conversation.username}</p>
      <span style={{fontSize:'small'}}>{isOnline ? 'Online': 'Offline'}</span>
    </div>
    </div>
  )
}

export default Conversation