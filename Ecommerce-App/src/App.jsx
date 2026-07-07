import { useState } from "react";
import { Route,Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart.jsx";
import Header from "./components/Layout/Header";
import Home from "./components/Pages/Home";
import Store from "./components/Pages/Store";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact.jsx";

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
      <Header onShow={showCartHandler} />
      <Cart show={showCart} onHide={hideCartHandler} />

      <Switch>
        <Route exact path="/" component={Home } />
        <Route path="/store" component={Store} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact } />
      </Switch>
    </>
  );
}

export default App;