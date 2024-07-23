import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"

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
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>  
          <div>
            <label style={{display: "flex"}}>Username:</label>
            <input type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              />
          </div>  
          <div>
            <label style={{display: "flex"}}>Password:</label>
            <input type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} /><br 
              />
          </div>
        <button type="submit" disabled={loading}>Log in</button>
        <Link to="/signup">First time here? Sign up! </Link>

      </form>

    </div>
  )
}

export default Login