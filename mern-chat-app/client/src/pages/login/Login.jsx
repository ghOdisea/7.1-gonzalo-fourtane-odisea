import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"
import '../styles/Login-Register.css'
import { Button, Input } from "@chakra-ui/react"

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { loading, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id="login-form">
        <h2>Login</h2>  
          <div className="inputs-container">
            <label className="input-label">Username:</label>
            <Input type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              />
            <label className="input-label">Password:</label>
            <Input
              focusBorderColor='blue.400' 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} /><br 
              />
          </div>
        <Button className="login-button" type="submit" disabled={loading} colorScheme='teal' size='md'>Log in</Button><br/>
        <Link to="/signup">First time here? Sign up! </Link>

      </form>

    </div>
  )
}

export default Login