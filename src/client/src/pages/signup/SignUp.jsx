
const SignUp = () => {
  return (
    <div>
      <form >
        <h2>SignUp</h2>
        <label className="" style={{display: "flex"}}>Username:</label>
        <input type="text" />
        <label className="" style={{display: "flex"}}>Password:</label>
        <input type="password" />
        <label className="" style={{display: "flex"}}>Confirm password:</label>
        <input type="password" /><br />
        <a href="">Already signed up? Log in! </a>
      </form>
    </div>
  )
}

export default SignUp