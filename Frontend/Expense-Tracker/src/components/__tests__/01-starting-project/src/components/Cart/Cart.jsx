import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContent";
import CartItems from "./CartItems";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  return (
    <Modal onClose={props.onClose}>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItems key={item.id} item={item}/>
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
