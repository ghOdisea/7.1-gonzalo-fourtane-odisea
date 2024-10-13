import ChatContainer from '../../components/chat/ChatContainer'
import SideBar from '../../components/sidebar/SideBar'
import '../../components/styles/Home.css'
import { useAuthContext } from '../../context/AuthContext'

const Chat = () => {

  const {authUser} = useAuthContext()

  return (
    <>
    <h1>{authUser.username}</h1>
    <hr />
    <div id="home-container">
      <SideBar />
      <ChatContainer />
    </div>
    </>
  )
}

export default Chat