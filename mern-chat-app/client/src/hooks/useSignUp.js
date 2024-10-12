import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const signup = async ( {username, password, confirmPassword} ) => {
        const success = handleInputErrors({username, password, confirmPassword})
        if(!success) return;
        setLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password, confirmPassword })
            })

            const data = await res.json()
            if(data.error){ 
                throw new Error(data.error)
            }

            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return {loading, signup}
}
export default useSignUp

function handleInputErrors({username, password, confirmPassword}){
    if(!username || !password || !confirmPassword){
        toast.error('Plese fill all fields')
        return false
    }
    if( password != confirmPassword){
        toast.error("Passwords don't match")
        return false
    }
    if(password.length < 6){
        toast.error("Password must be at least 6 characters")
        return false
    }
    return true
}