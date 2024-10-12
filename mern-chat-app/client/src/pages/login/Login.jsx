import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"
import '../styles/Login-Register.css'

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
            <input type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              />
            <label className="input-label">Password:</label>
            <input type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} /><br 
              />
          </div>
        <button className="login-button" type="submit" disabled={loading}>Log in</button><br/>
        <Link to="/signup">First time here? Sign up! </Link>

      </form>

    </div>
  )
}

export default Login