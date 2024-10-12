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
  const spanClass = isOnline ? 'online' : 'offline'

  return (
    <div id='conversation-container'
    className={isSelected ? 'selectedConversation' : ''} 
    onClick={() => setSelectedConversation(conversation)}
    >
      {/* Aqui va la imagen: */}
      <BadgeAvatar  />    
        <p className='name-label'>{conversation.username}</p>
        <span style={{fontSize:'small'}} className={spanClass}>{isOnline ? 'Online': 'Offline'}</span>
    </div>
  )
}

export default Conversation