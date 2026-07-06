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
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          The Generics
        </Navbar.Brand>

        <Nav className="me-auto">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/store">
            Store
          </NavLink>
          <NavLink to="/about">
            About
          </NavLink>
        </Nav>

        {showCartButton && (
          <Button variant="outline-light" onClick={onShow}>
            Cart {len}
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;