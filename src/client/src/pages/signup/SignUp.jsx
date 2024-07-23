import { useState } from "react"
import { Link } from "react-router-dom"
import useSignUp from "../../hooks/useSignUp"

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
      <form onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <label className="" style={{display: "flex"}}>Username:</label>
        <input type="text" 
          value={inputs.username}
          onChange={(e)=> setInputs({...inputs, username: e.target.value})}
        />

        <label className="" style={{display: "flex"}}>Password:</label>
        <input type="password" 
          value={inputs.password}
          onChange={(e)=> setInputs({...inputs, password: e.target.value})}
        />
        
        <label className="" style={{display: "flex"}}>Confirm password:</label>
        <input type="password" 
          value={inputs.confirmPassword}
          onChange={(e)=> setInputs({...inputs, confirmPassword: e.target.value})}
        /><br />
        <button type="submit"
        disabled={loading}
        >Register</button>
        <Link to="/login">Already signed up? Log in! </Link>
      </form>
    </div>
  )
}

export default SignUp