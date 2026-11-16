import { useContext } from "react";
import CartContext from "../Store/CartContext";

function CartItem({ item }) {
  const cartCtx = useContext(CartContext);

  return (
    <div>
      <img src={item.imageUrl} alt={item.title} width="80" />
      <h4>{item.title}</h4>
      <p>₹{item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => cartCtx.removeItem(item)}>Remove</button>
    </div>
  );
}

export default CartItem;
