import MessageReceived from "./MessageReceived"
import MessageSent from "./MessageSent"

const Messages = () => {
  return (
    <div id="messages-container">
        <MessageReceived />
        <MessageSent />
        {/* <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived />
        <MessageSent />
        <MessageReceived /> */}
    </div>
  )
}

export default Messages