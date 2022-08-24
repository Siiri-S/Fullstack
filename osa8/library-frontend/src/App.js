import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedPage from './components/Recommended'


const Notification = ( { message }) => {
  if (message === '') {
    return null
  }
  return <div style={{ color: 'red' }}>{message}</div>
}


const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={logout}>logout</button>}
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        <Notification message={message} />
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <RecommendedPage show={page === 'recommended'} />

      <LoginForm show={page === 'login'} setToken={setToken} setMessage={notify} setPage={setPage}/>
    </div>
  )
}

export default App
