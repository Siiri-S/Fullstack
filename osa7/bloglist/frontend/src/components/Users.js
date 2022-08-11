import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
//import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
// <Link to={`/users/${user.user.id}`}>{user.user.name}</Link>

const User = (user) => {
  return (
    <tr>
      <td>
        <Nav.Link as={NavLink} to={`/users/${user.user.id}`} exact="true">
          {user.user.name}
        </Nav.Link>
      </td>
      <td>{user.user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector((state) => state.userList)

  return (
    <Table striped>
      <thead>
        <tr>
          <th>User</th>
          <th>No. of blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.slice().map((user) => (
          <User key={user.id} user={user} />
        ))}
      </tbody>
    </Table>
  )
}

export default Users
