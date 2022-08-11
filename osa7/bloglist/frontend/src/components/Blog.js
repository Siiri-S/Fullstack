import { useParams } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  console.log(blog)
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeBlog(blog, blog.id))
    dispatch(
      setNotification(
        `liked blog '${blog.title}' by ${blog.author}`,
        'status',
        3
      )
    )
  }
  const padding = {
    paddingTop: 10,
    paddingBottom: 10,
  }
  if (!blog) return null
  return (
    <div style={padding}>
      <h4>
        {blog.title} by {blog.author}
      </h4>
      <Nav.Link href="#">{blog.url}</Nav.Link>
      <br />
      likes {blog.likes}
      <Button
        variant="outline-primary"
        id="like-button"
        size="sm"
        onClick={handleLike}
        className="ms-2"
      >
        like
      </Button>{' '}
      <br />
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default Blog
