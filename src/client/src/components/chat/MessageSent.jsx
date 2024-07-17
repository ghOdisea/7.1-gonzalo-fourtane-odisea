import Avatar from '@mui/material/Avatar';

const MessageSent = () => {
  return (
    <div className="msg-sent">

        <div id="msg-content">
            <p>
                Soy el mensaje enviado
            </p>
        </div>
        <div id="msg-img">
        <Avatar alt="NN" src="/static/images/avatar/1.jpg"/>
        </div>
    </div>
  )
}

export default MessageSent