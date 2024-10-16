/* eslint-disable react/prop-types */
import { Avatar } from '@chakra-ui/react';
import { useAuthContext } from '../../context/AuthContext';
// import useConversation from '../../store/useConversation';

const Message = ({message}) => {

  const {authUser} = useAuthContext()
  const fromMe = message.senderId === authUser.id
  const chatClassName = fromMe ? 'msg-sent' : 'msg-received'

  const shakeClass = message.shouldShake ? 'shake' : ''

  //TODO Profile Pic + color change + time of message


if(fromMe){ return(
<div id="chat-message" className={chatClassName}>
        <div id="msg-content" className={shakeClass}>
            <p >{message.msgContent}</p>
        </div>
        <Avatar/>
    </div>
  )
}else{
  return (
    <div id="chat-message" className={chatClassName}>
        <div id="msg-img">
        <Avatar/>
        </div>
        <div id="msg-content" className={shakeClass}>
            <p>
                {message.msgContent}
            </p>
        </div>
    </div>
  )

}
}

export default Message