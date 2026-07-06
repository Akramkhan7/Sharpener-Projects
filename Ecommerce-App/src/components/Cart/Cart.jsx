import { Modal, Button } from "react-bootstrap";
import cartElements from "./cartData";
import CartItem from "./CartItem";
import "./Cart.css";

function Cart({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="cart-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {cartElements.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartElements.map((item) => (
            <CartItem key={item.title} item={item} />
          ))
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cart;