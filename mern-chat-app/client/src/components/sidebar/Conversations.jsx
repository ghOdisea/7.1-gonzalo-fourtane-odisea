import Conversation from '../sidebar/Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { ImSpinner } from 'react-icons/im'


const Conversations = () => {
  const {loading, conversations} = useGetConversations()


  return (
    <div id='sidebar-conversations'>
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