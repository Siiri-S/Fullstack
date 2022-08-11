import { useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'

import { Routes, Route, Navigate } from 'react-router-dom'

import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userListReducer'
import { setLoggedUser } from './reducers/userReducer'
import Menu from './components/Menu'
import User from './components/User'
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
    }
  }, [])

  return (
    <div className="container">
      <Menu />
      <Notification />
      <Routes>
        <Route
          path="/blogs/:id"
          element={user ? <Blog /> : <Navigate replace to="/" />}
        />
        <Route
          path="/users/:id"
          element={user ? <User /> : <Navigate replace to="/" />}
        />
        <Route path="/" element={<Blogs user={user} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/" />}
        />
      </Routes>
    </div>
  )
}
export default App
