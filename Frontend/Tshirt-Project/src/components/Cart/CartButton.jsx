import React from 'react'
import classes from './Cart.module.css'

function CartButton({ content, onClick }) {
  return (
    <button className={classes.button} onClick={onClick}>
      {content}
    </button>
  );
}

export default CartButton;
