import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import CartContext from "../Store/CartContext";

function Header({ onShow }) {
  const cartCtx = useContext(CartContext);
  const len = cartCtx?.items?.length ?? 0;
  const location = useLocation();
  const showCartButton = location.pathname === "/store";

  return (
   <Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand as={NavLink} to="/">
      The Generics
    </Navbar.Brand>

    <Nav className="mx-auto">
      <Nav.Link as={NavLink} to="/" end>
        Home
      </Nav.Link>

      <Nav.Link as={NavLink} to="/store">
        Store
      </Nav.Link>

      <Nav.Link as={NavLink} to="/about">
        About
      </Nav.Link>
    </Nav>

    {showCartButton && (
      <Button variant="outline-light" onClick={onShow}>
        Cart ({len})
      </Button>
    )}
  </Container>
</Navbar>
  );
}

export default Header;