import { Navbar, Container, Nav } from 'react-bootstrap'
import { path } from 'lib/path'
import Link from 'next/link'

export const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
        <Container>
          <Link href={path.top} passHref>
            <Navbar.Brand href={path.top}>Kaede-Viewer</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Link href={path.search} passHref>
                <Nav.Link>Search</Nav.Link>
              </Link>
              <Link href={path.extract} passHref>
                <Nav.Link>Extract</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
