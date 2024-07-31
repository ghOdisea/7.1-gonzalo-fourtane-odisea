/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from 'socket.io-client'



export const SocketContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    return useContext(SocketContext)
}

// eslint-disable-next-line react/prop-types
export const SocketContextProvider = ({children}) => {
    const {authUser} = useAuthContext()
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    
    const SocketPort = import.meta.env.VITE_SERVER_HOST_URL

    useEffect(() => {
        if(authUser!= null) {
            const socket = io(SocketPort, {
                query: {
                    userId: authUser.id
                },
                withCredentials: true
            })
            console.log('authUser Id: ', authUser.id)

                setSocket(socket)
                
                
                socket.on("getOnlineUsers", (users) => {
                    setOnlineUsers(users)
                })
                
            return () => socket.close()
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])

    return <SocketContext.Provider value={{socket, onlineUsers}}> {children} </SocketContext.Provider>
    
}
