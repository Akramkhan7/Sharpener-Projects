import { useContext, useState } from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import Cart from "./components/Cart/Cart.jsx";
import Header from "./components/Layout/Header";
import Home from "./components/Pages/Home";
import Store from "./components/Pages/Store";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact.jsx";
import Products from "./components/ProductSection/Products.jsx";
import ProductDetails from "./components/ProductSection/ProductDetails.jsx";
import Login from "./components/Pages/Login.jsx";
import AuthContext from "./components/Store/AuthContext.jsx";

function App() {
  const [showCart, setShowCart] = useState(false);
  const authCtx = useContext(AuthContext);

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
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Login} />
        <Route path="/store" component={Store} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />

        <Route exact path="/products">
          {authCtx.isLoggedIn ? <Products /> : <Redirect to="/auth" />}
        </Route>

        <Route path="/products/:productId">
          {authCtx.isLoggedIn ? <ProductDetails /> : <Redirect to="/auth" />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
