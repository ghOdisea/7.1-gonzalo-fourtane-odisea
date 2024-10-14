import { useState } from "react"
import { Link } from "react-router-dom"
import useSignUp from "../../hooks/useSignUp"
import '../styles/Login-Register.css'
import { Button, Container, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"


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
    <Container className="register-container" mt={"100px"}>
      <form onSubmit={handleSubmit} id="signup-form">
        <FormControl >
          <Heading className="register-heading" size={'lg'}>SignUp</Heading>
          <Container className="inputs-container">
            <FormLabel className="register-label">Username:</FormLabel>
            <Input type="text" 
              value={inputs.username}
              onChange={(e)=> setInputs({...inputs, username: e.target.value})}
            />

            <FormLabel className="register-label">Password:</FormLabel>
            <Input type="password" 
              value={inputs.password}
              onChange={(e)=> setInputs({...inputs, password: e.target.value})}
            />
            
            <FormLabel className="register-label">Confirm password:</FormLabel>
            <Input type="password" 
              value={inputs.confirmPassword}
              onChange={(e)=> setInputs({...inputs, confirmPassword: e.target.value})}
            /><br />
          </Container>
          <Button className='auth-submit-btn' type="submit" disabled={loading} colorScheme='teal' size='md' >Register </Button><br />
          <Link to="/login">Already signed up? Log in! </Link>
        </FormControl>
      </form>  
    </Container >
  )
}

export default SignUp