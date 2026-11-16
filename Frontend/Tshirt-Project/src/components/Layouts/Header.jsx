import React, { useContext } from "react";
import classes from "./Header.module.css"
import CartContext from "../../store/CartContext";

function Header({onShow}) {

  const cartCtx = useContext(CartContext);
  const len = cartCtx.cartItems.length;
  
  return (
    <>
     <header className={classes.header}>
        <h1>T-Shirt Store</h1>
       
        <button onClick={onShow}>
           <span>Cart</span>
          <span>{len}</span>
        </button>
         
        
      </header>

     
    </>
  );
}

export default Header;
