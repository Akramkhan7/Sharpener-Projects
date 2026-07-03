import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

function Cart(props) {
  const cartItems = [{ id: 1, name: "Sushi", amount: 2, price: 13.0 }];
  return (
    <Modal onClose={props.onClose}>
      <ul className={classes["cart-items"]}>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.amount} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$34.00</span>
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
