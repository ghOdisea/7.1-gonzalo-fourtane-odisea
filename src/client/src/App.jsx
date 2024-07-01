// import { useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './components/Auth/Register/Register'
import { Login } from './components/Auth/Login/Login'
import { Home } from './components/Home'
import { ChatClient } from './components/ChatClient/ChatClient'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/chat' element={<ChatClient />} />
      <Route path='/about' element={<Home />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
