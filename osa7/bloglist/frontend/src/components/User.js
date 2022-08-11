import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge, ListGroup } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'

const Blog = (blog) => {
  const blogs = useSelector((state) => state.blogs)
  const likes = [...blogs].find((b) => b.id === blog.blog.id).likes
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{blog.blog.title}</div>
        <Nav.Link href="#">{blog.blog.url}</Nav.Link>
      </div>
      <Badge bg="primary" pill>
        likes: {likes}
      </Badge>
    </ListGroup.Item>
  )
}

const User = () => {
  const id = useParams().id
  const users = useSelector((state) => state.userList)

  const user = [...users].find((user) => user.id === id)

  if (!user) {
    return null
  }
  const padding = {
    paddingTop: 10,
    paddingBottom: 10,
  }
  return (
    <div style={padding}>
      <h3 className="mb-3">{user.name}</h3>
      <h5 className="mb-3">added blogs</h5>
      <ListGroup as="ol" numbered>
        {user.blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ListGroup>
    </div>
  )
}

export default User
