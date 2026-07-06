import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function Header({ onShow }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>The Generics</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>Store</Nav.Link>
          <Nav.Link>About</Nav.Link>
        </Nav>

        <Button variant="outline-light" onClick={onShow}>
          Cart
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;