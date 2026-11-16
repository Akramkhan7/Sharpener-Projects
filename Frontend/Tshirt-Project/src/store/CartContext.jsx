import { createContext } from "react";

const CartContext = createContext({
  products: [],
  cartItems: [],
  addProduct: () => {},
  buyProduct: () => {},
});

export default CartContext;
