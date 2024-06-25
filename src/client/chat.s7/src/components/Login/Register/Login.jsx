import './Login.css'

export function Login () {
    //TODO HandleSubmits
    return (
        <>
         <h3>Login</h3>
        <section className="login-form">
            <form id="login-form">
                <input type="text" id="login-username" placeholder="username" name="login-username"></input><br />
                <input type="password" id="login-password" placeholder="password" name="password"></input><hr />
                <button type="submit">Login</button>
            </form>
        </section>
        </>

    )
}