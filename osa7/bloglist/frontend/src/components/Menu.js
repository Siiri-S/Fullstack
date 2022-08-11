import Container from 'react-bootstrap/Container'
import { Navbar, Nav } from 'react-bootstrap'
import Logout from './Logout'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Menu = () => {
  const user = useSelector((state) => state.user)
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="">Blogs App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" exact="true">
                Blogs
              </Nav.Link>
              <Nav.Link as={NavLink} to="/users" exact="true">
                Users
              </Nav.Link>
              <Nav.Link href="#" as="span"></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
        <Navbar.Collapse className="justify-content-end">
          {user && (
            <Navbar.Text>
              Signed in as: {user.name} <Logout />{' '}
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu
