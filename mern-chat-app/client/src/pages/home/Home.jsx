import { Link } from 'react-router-dom'
import '../../components/styles/Home.css'
import {  Button, Divider, Heading,  VStack } from '@chakra-ui/react'

const Home = () => {
  return (
    <>
    <Heading className="home-heading" size={'lg'} display={'flex'} justifyContent={'center'} mt={"100px"}>Welcome to Shat-App!</Heading>
    <Divider />
    <VStack spacing={4} mt={"50px"}>

    <Button w={"120px"} h={"50px"} bg={"blue.400"}> 
      <Link to="/signup">Sign Up</Link>
    </Button>
    <Button w={"120px"} h={"50px"} bg={"blue.400"}> 
      <Link to="/login">Log In</Link>
    </Button>
    </VStack>
    

    </>

  )
}

export default Home