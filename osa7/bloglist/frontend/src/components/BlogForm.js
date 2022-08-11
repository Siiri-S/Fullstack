import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    dispatch(createBlog(blogObject))
    dispatch(
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        'status',
        5
      )
    )
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Add a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="www.example.com"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </>
  )
}

export default BlogForm
