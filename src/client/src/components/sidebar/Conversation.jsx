/* eslint-disable react/prop-types */
import '../styles/sidebar/Conversation.css'
import BadgeAvatar from './BadgeAvatar'
import useConversation from '../../store/useConversation'

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id === conversation._id
  
  return (
    <div id='conversation-container'
    className={isSelected? 'selectedConversation' : ''} 
    onClick={() => setSelectedConversation(conversation)}
    >
    {/* Aqui va la imagen: */}
    <BadgeAvatar />  
    <div id='contact-container'>
      <p>{conversation.username}</p>
    </div>
    </div>
  )
}

export default Conversation