import { useState } from "react"
import { Link } from "react-router-dom"
import useSignUp from "../../hooks/useSignUp"
import '../styles/Login-Register.css'


const SignUp = () => {

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const {loading, signup} = useSignUp()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)
  }
    

  return (
    <div>
      <form onSubmit={handleSubmit} id="signup-form">
        <h2>SignUp</h2>
        <div className="inputs-container">
          <label className="input-label">Username:</label>
          <input type="text" 
            value={inputs.username}
            onChange={(e)=> setInputs({...inputs, username: e.target.value})}
          />

          <label className="input-label">Password:</label>
          <input type="password" 
            value={inputs.password}
            onChange={(e)=> setInputs({...inputs, password: e.target.value})}
          />
          
          <label className="input-label">Confirm password:</label>
          <input type="password" 
            value={inputs.confirmPassword}
            onChange={(e)=> setInputs({...inputs, confirmPassword: e.target.value})}
          /><br />
        </div>
        <button type="submit" disabled={loading} >Register </button><br />
        <Link to="/login">Already signed up? Log in! </Link>
      </form>
    </div>
  )
}

export default SignUp