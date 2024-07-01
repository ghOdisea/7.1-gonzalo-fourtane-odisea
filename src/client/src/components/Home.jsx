import { Link } from "react-router-dom";

export function Home (){
    return(
        <>
        <h1>Home</h1>

        <nav>
            <ul>
                <Link to='/'>Home</Link><br />
                <Link to='/login'>Log in</Link><br />
                <Link to='/register'>Register</Link><br />
                <Link to='/chat'>Chat</Link><br />
                <Link to='/about'>About</Link><br />
            </ul>
        </nav>
        </>
    )
}