import { Container, Heading } from '@chakra-ui/react'
import ChatContainer from '../../components/chat/ChatContainer'
import SideBar from '../../components/sidebar/SideBar'
import '../../components/styles/Home.css'
import { useAuthContext } from '../../context/AuthContext'

const Chat = () => {

  const {authUser} = useAuthContext()

  return (
    <>
      <Heading className="home-heading">{authUser.username}</Heading>
    <Container id="home-container" display={'flex'}>
      <SideBar />
      <ChatContainer />
    </Container>
    </>
  )
}

export default Chat