import '../styles/sidebar/Conversation.css'
import BadgeAvatar from './BadgeAvatar'

const Conversation = () => {
  return (
    <div id='conversation-container'>
    <BadgeAvatar />  
    <div id='contact-container'>
      <p>Pepito Planta</p>
    </div>
    </div>
  )
}

export default Conversation