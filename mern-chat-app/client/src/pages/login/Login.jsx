import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"
import '../styles/Login-Register.css'
import { Button, Container, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { loading, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  return (
  <Container className="login-container" mt={"100px"}>
    <form  onSubmit={handleSubmit} className="login-form">

      <FormControl>
        <Heading 
          className="login-heading" 
          size={'lg'}
          >
          Login
          </Heading>  
            <FormLabel className="input-label">Username:</FormLabel>
              <Input type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                />
            <FormLabel className="input-label">Password:</FormLabel>
              <Input
                focusBorderColor='blue.400' 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <br />
        <Button  
          className="auth-submit-btn" 
          type="submit" 
          isLoading={loading} 
          colorScheme='teal' 
          size='md' 
          >
            Log in
          </Button>
          <br/>
        <Link to="/signup">First time here? Sign up! </Link>
      </FormControl>
    </form>
  </Container> 

    )
}

export default Login