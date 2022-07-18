import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const showStatusMessage = (message) => {
    setStatusMessage(message)
    setTimeout(() => {
      setStatusMessage(null)
    }, 2000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password,})
        setUser(user)
        setPassword('')
        setUsername('')
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
        showStatusMessage('login successful')
    } catch (exception) {
      showErrorMessage('wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    
    setUser(null)
    localStorage.clear()
    showStatusMessage('logged out')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    showStatusMessage(`a new blog ${response.title} by ${response.author} added`)
    setBlogs(blogs.concat(response))
  }

  const likeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {...blog, likes: blog.likes + 1}
    const response = await blogService.update(id, changedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (blog.user.username === user.username) {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}`))
        blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        showStatusMessage(`blog removed`)

    }
  }

  

  return (
    
    <div>
      <Notification message={errorMessage} type='error' />
      <Notification message={statusMessage} type='status' />
      {user === null
        ? <Login 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
        /> 
        : <>
            <h2> blogs </h2>
            <Logout name={user.name} handleLogout={handleLogout}/>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}> 
              <BlogForm 
                createBlog={addBlog}
              />
            </Togglable>
            {blogs.sort((a, b) =>  b.likes -a.likes).map(blog =>
              <Blog 
                key={blog.id} 
                blog={blog} 
                user={user} 
                likeBlog={() => likeBlog(blog.id)} 
                removeBlog={() => deleteBlog(blog.id)} 
              />
              )}
            
          </>
      }
    </div>
  )
}

export default App
