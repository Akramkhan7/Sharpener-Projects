import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContent";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  return (
    <Modal onClose={props.onClose}>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.amount} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount}</span>
      </div>

      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onClose}>
          Close
        </button>

        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
