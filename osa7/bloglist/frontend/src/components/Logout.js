import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Logout = () => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(clearUser())
    localStorage.clear()
    dispatch(setNotification('logged out', 'status', 3))
  }
  return (
    <>
      <button onClick={handleLogout}>logout</button>
    </>
  )
}

export default Logout
