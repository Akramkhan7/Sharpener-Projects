import React, { Suspense, lazy, useContext, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import AuthContext from "./components/Store/AuthContext";

const Home = lazy(() => import("./components/Pages/Home"));
const Store = lazy(() => import("./components/Pages/Store"));
const About = lazy(() => import("./components/Pages/About"));
const Contact = lazy(() => import("./components/Pages/Contact"));
const Products = lazy(() => import("./components/ProductSection/Products"));
const ProductDetails = lazy(() =>
  import("./components/ProductSection/ProductDetails")
);
const Login = lazy(() => import("./components/Pages/Login"));


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
<Suspense fallback={<h2>Loading...</h2>}>
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
      </Suspense>
    </>
  );
}

export default App;
