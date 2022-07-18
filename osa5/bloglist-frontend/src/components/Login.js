import PropTypes from 'prop-types'
const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
            username
        <input
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
            password
        <input
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}


const Login = (props) => {
  return(
    <>
      <h2>login to application</h2>
      <LoginForm
        username={props.username}
        setUsername={props.setUsername}
        password={props.password}
        setPassword={props.setPassword}
        handleLogin={props.handleLogin}
      />
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login

