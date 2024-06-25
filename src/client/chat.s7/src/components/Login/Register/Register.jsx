import './Register.css'

export function Register () {
    //TODO HandleSubmit
    return (
        <>
        <h3>Register</h3>
        <section className="register">
                <form id="register-form">
                    <input type="text" id="register-username" placeholder="username"  name="register-username"></input><br />
                    <input type="password" id="register-password" placeholder="password"></input><br />
                    <input type="password" id="confirm-password" placeholder="confirm Password"></input><hr />
                    <button type="submit">Register</button>
                </form>
        </section>
        </>
    )
}