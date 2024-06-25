import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Login } from './components/Login/Register/Login.jsx'
import { Register } from './components/Login/Register/Register.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login /><Register />
    <App />
  </React.StrictMode>,
)
