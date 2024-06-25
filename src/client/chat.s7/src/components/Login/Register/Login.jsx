export function Login () {
    //TODO HandleSubmits
    return (
        <section className="login-form">
         <h3>Login</h3>
            <form id="login-form">
                <input type="text" id="login-username" placeholder="username" name="login-username"></input><br />
                <input type="password" id="login-password" placeholder="password" name="password"></input><hr />
                <button type="submit">Login</button>
            </form>
        </section>
    )
}