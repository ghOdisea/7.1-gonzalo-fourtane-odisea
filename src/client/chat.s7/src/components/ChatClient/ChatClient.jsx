import {useState, useEffect} from "react";
import io from 'socket.io-client'
import './ChatClient.css'

const socket = io('http://localhost:3000')

export const ChatClient = () => {

    const[message, setMessage] = useState('')
    const[username, setUsername] = useState('')
    const[listMessages, setListMessages] = useState([
        {
        body: 'Welcome to the chat room 1',
        user: '',
        } 
    ])
//Captura valores y los emite a traves del socket, luego crea el objeto de mensaje, y lo guarda en la lista de mensajes.
    const handleSubmit =  e => {
        e.preventDefault()
        socket.emit('message', { body: message, user: username})

        const newMessage = {
            body: message,
            user: username,
        }

        setListMessages([...listMessages, newMessage])
        setMessage('')
    }
//
    useEffect( () => {
        const receivedMessage = msg => {
            setListMessages([...listMessages, msg])
        }
        socket.on('message', receivedMessage)
        return () => socket.off('message', receivedMessage)
        
    }, [listMessages])

    return (
        <section className="chat-box">
            <span className="title">Chat-io</span>
            <div className="login-input">

            <input onChange={e => setUsername(e.target.value)} className="txt-username" type="text" placeholder="Your name here"/>
            </div>

            <div className="div-chat" >
                {
                listMessages.map( (message, index) => (
                    <p key={message+index}>
                        {message.user} - {message.body}
                    </p>
                ))
            }
            </div>
        <form onSubmit={handleSubmit} className="chat-form">
            <div className="div-input-chat">
                <input 
                value={message}
                placeholder="Type your message"
                onChange={ e => setMessage(e.target.value)}
                type="text" name="text" id="chat-message"
                />
                <button type="submit">Send</button>
            </div>
        </form>
        </section>
    )
}