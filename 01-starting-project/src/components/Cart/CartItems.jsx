import { useContext } from "react";
import classes from "./CartItem.module.css"
import CartContext from "../../store/CartContent";

function CartItems(props) {
  const { item } = props;
  const cartCtx = useContext(CartContext);

  return (
    <li className={classes.main}>
      <div className={classes.container}>
        <h2>{item.name}</h2>

        <div className={classes.item}>
          <span>${item.price.toFixed(2)}</span>
          <span>x {item.amount}</span>
        </div>
      </div>

      <div className={classes.actions}>
        <button onClick={()=> cartCtx.removeItem(item.id)}>-</button>
        <button >+</button>
      </div>
    </li>
  );
}

export default CartItems;