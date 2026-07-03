import React, { useContext } from "react";
import classes from "./Header.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContent";

function Header(props) {
  const cartCtx = useContext(CartContext);
  const len  = cartCtx.items.length;
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <button  className={classes.button} onClick={props.onShowCart}>
          <span className={classes.icon}>
            <CartIcon />
          </span>
          <span>Your Cart</span>
          <span className={classes.badge}>{len}</span>
        </button>
      </header>

      <div className={classes["main-image"]}>
        <img
          src="https://github.com/academind/react-complete-guide-code/blob/11-practice-food-order-app/extra-files/meals.jpg?raw=true"
          alt=""
        />
      </div>
    </>
  );
}

export default Header;
