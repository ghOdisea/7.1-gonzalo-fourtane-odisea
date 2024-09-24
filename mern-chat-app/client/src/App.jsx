// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import Chat from './pages/chat/Chat'

function App() {
  const {authUser} = useAuthContext()
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} /> 
      <Route path='/chat' element={authUser? <Chat /> : <Navigate to='/login'/> } /> 
      <Route path='/login' element={authUser? <Navigate to='/chat'/> : <Login />} /> 
      <Route path='/signup' element={authUser? <Navigate to='/chat'/> : <SignUp />}  /> 
    </Routes>    
    <Toaster />
    </>
  )
}

export default App
