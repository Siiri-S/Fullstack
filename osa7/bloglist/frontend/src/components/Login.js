import { useDispatch, useSelector } from 'react-redux'
import {
  setUsername,
  setPassword,
  clearUserInfo,
} from '../reducers/userInfoReducer'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const { username, password } = useSelector((state) => state.userInfo)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      dispatch(clearUserInfo())
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setNotification('login successful', 'status', 3))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }
  return (
    <>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  )
}

export default Login
