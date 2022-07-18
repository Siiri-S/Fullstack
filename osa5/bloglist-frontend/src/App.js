import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogService.create(blogObject)
    showStatusMessage(`a new blog ${response.title} by ${response.author} added`)
    setBlogs(blogs.concat(response))
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
            <BlogForm 
              addBlog={addBlog}
              title={title}
              author={author}
              url={url}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
            />
            <Blogs blogs={blogs} /> 
          </>
      }
    </div>
  )
}

export default App
