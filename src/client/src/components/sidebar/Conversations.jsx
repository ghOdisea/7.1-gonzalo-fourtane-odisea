import Conversation from '../sidebar/Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { ImSpinner } from 'react-icons/im'

import '../styles/sidebar/Conversations.css'

const Conversations = () => {
  const {loading, conversations} = useGetConversations()


  return (
    <div id='conversations-container'>
    Conversations:
    {conversations.map((conversation) => (
      <Conversation
        key={conversation._id}
        conversation={conversation}
      />
    ))}
    
    {loading ? <ImSpinner /> : null }
    </div>
  )
}

export default Conversations