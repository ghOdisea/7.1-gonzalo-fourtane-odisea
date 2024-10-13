/* eslint-disable react/prop-types */
import '../styles/sidebar/Conversation.css'
import { Avatar, AvatarBadge } from '@chakra-ui/react'
import useConversation from '../../store/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id === conversation._id
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)
  const spanClass = isOnline ? 'green.500' : 'red.500'

  return (
    <div id='conversation-container'
    className={isSelected ? 'selectedConversation' : ''} 
    onClick={() => setSelectedConversation(conversation)}
    >
      <Avatar name={conversation.username} src={conversation.avatar}>
      <AvatarBadge  boxSize='1.25em' bg={spanClass}/>    
      </Avatar>
        <span style={{fontSize:'small'}} className={spanClass}>{isOnline ? 'Online': 'Offline'}</span>
    </div>
  )
}

export default Conversation