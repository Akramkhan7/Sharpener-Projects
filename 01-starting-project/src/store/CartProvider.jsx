import React, { useState } from "react";
import CartContext from "./CartContent";

function CartProvider(props) {
  const [items, setItems] = useState([
    { id: 1, name: "Sushi", amount: 4, price: 13.0 },
  ]);

  const addItemToCartHandler = (item) => {
    setItems((prev) => {
      return [...prev, item];
    });
  };
  const removeItemToCartHandler = () => {};

   const totalAmount = items.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
