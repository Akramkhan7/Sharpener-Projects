import { useState } from "react";
import ProductList from "../Products/ProductList";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";

function Store() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      {/* If Header stays in App, remove this line */}
      {/* <Header onShow={() => setShowCart(true)} /> */}

      <Cart
        show={showCart}
        onHide={() => setShowCart(false)}
      />

      <ProductList />
    </>
  );
}

export default Store;