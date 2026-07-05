import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import CartButton from "./CartButton";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

function Cart({ onClose }) {
  const cartCtx = useContext(CartContext);

  const total = cartCtx.cartItems.reduce((sum, item) => {
    const qty = item.large + item.medium + item.small;
    return sum + qty * item.price;
  }, 0);

  return (
    <Modal onClose={onClose}>
      <div className={classes.cart}>
        <h2 className={classes.title}>Cart</h2>

        <div className={classes.items}>
          {cartCtx.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <hr />

        <div className={classes.total}>
          <h3>Total</h3>
          <h3>₹{total}</h3>
        </div>

        <div className={classes.actions}>
          <CartButton content="Cancel" onClick={onClose} />
          <CartButton content="Order" />
        </div>
      </div>
    </Modal>
  );
}

export default Cart;