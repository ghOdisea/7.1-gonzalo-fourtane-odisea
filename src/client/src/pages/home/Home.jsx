import { Link } from 'react-router-dom'
import '../../components/styles/Home.css'

const Home = () => {
  return (
    <>
    <h1>Welcome to Shat-App!</h1>
 
    <h3>Home</h3>

    <Link to="/signup">Sign Up</Link>
    <Link to="/login">Log In</Link>

    </>

  )
}

export default Home