import ChatContainer from "../../components/chat/ChatContainer"
import SideBar from "../../components/sidebar/SideBar"
import '../../components/styles/Home.css'

const Home = () => {
  return (
    <>
    <h2>Home</h2>
    <div id="home-container">
      <SideBar />
      <ChatContainer />
    </div>
    </>

  )
}

export default Home