import { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

export function Login () {
    //TODO HandleSubmits
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit =(e)=> {
        e.preventDefault()

    try{
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({ username, password })
        })
        .then( res => {
            if(res.ok){
                setTimeout(() => {
                    window.location.href = '/chat'
                }, 1000);
                console.log(res)
            }else{
                console.log(username, password)
                console.log('there was an error')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }catch(err){
        console.error(err)
    }
}
    return (
        <>
        <h3>Login</h3>
        <section className="login-form">
            <form id="login-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    id="login-username" 
                    onChange={e=>{setUserName(e.target.value)}} 
                    placeholder="username" 
                    name="login-username">
                    </input>
                    <br />
                <input 
                    type="password" 
                    id="login-password" 
                    onChange={e=>{setPassword(e.target.value)}} 
                    placeholder="password" 
                    name="password">
                    </input>
                    <hr />
                <button type="submit">Login</button>
                <p>Not a user?</p>
                <Link to="/register">Register</Link>
            </form>
        </section><hr />
        <Link to='/'>Back home</Link>
        </>

    )
}