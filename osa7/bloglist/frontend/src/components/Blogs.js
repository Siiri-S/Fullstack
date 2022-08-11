import { NavLink } from 'react-router-dom'
import { Nav, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import Login from './Login'
import { useRef } from 'react'
import BlogForm from './BlogForm'
const Blog = ({ blog }) => {
  return (
    <tr>
      <td>
        <Nav.Link as={NavLink} to={`/blogs/${blog.id}`} exact="true">
          {blog.title} by {blog.author}
        </Nav.Link>
      </td>
    </tr>
  )
}

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })
  const padding = {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
  }
  const blogFormRef = useRef()
  return (
    <div style={padding}>
      {user === null ? (
        <Login />
      ) : (
        <>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <Table className="mt-3" striped>
            <tbody>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default Blogs
