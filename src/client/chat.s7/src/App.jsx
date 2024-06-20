import './App.css'
import { ChatClient } from './components/ChatClient/ChatClient'

function App() {

  return (
    <section className='home'>
      <h1>Soy el home</h1>

      <div className="container">

        <section className='chat-rooms'>
        <h3>Salas de chat</h3>
        <nav className="room-nav">

        <div>Sala 1</div>
        <div>Sala 2</div>
        <div>Sala 3</div>
        </nav>
        </section>

        <ChatClient />
      </div>

    </section>
  )
}

export default App
