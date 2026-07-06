import { useState } from 'react';
import Cart from './components/Cart/Cart.jsx';
import Header from './components/Layout/Header.jsx';
import ProductList from './components/Products/ProductList.jsx';

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
      <Cart show={showCart} onHide={hideCartHandler} />
      <Header onShow={showCartHandler} />
      <ProductList />
    </>
  );
}

export default App;

