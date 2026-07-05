import React, { useContext } from "react";
import CartContext from "../../store/CartContext";

function Cart() {
  const cartCtx = useContext(CartContext);

  const total = cartCtx.cartItems.reduce((sum, item) => {
    const qty = item.large + item.medium + item.small;
    return sum + qty * item.price;
  }, 0);

  return (
    <div>
      <h2>Cart</h2>

      {cartCtx.cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.tshirtName}</h3>

          <p>
            {item.large > 0 && `${item.large} L `}
            {item.medium > 0 && `${item.medium} M `}
            {item.small > 0 && `${item.small} S`}
          </p>

          <p>
            ₹
            {(item.large + item.medium + item.small) * item.price}
          </p>
        </div>
      ))}

      <hr />

      <h3>Total : ₹{total}</h3>
    </div>
  );
}

export default Cart;