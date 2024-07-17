import Avatar from '@mui/material/Avatar';

const MessageReceived = () => {
  return (
    <div className="msg-received">
        <div id="msg-img">
        <Avatar alt="NN" src="/static/images/avatar/1.jpg"/>
        </div>

        <div id="msg-content">
            <p>
                Soy el mensaje recibido
            </p>
        </div>
    </div>
  )
}

export default MessageReceived