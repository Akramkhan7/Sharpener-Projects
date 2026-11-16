import React from "react";
import Header from "./components/Layouts/Header";
import AddProduct from "./components/Products/AddProduct";
import ProductList from "./components/Products/ProductList";
import { useState } from "react";
import Cart from "./components/Cart/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);
  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <>
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onShow={showCartHandler} />
      <AddProduct />
      <ProductList />
    </>
  );
}

export default App;
