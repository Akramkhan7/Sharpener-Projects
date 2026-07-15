import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import { useSelector } from "react-redux";
import ForgotPassword from "./components/Pages/ForgotPassword";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Route path="/forgot-password" exact component={ForgotPassword} />

      <Route path="/profile">
        {isAuthenticated ? <Profile /> : <Redirect to="/auth" />}
      </Route>

      <Route path="/">
        {isAuthenticated ? <Home /> : <Redirect to="/auth" />}
      </Route>
    </Switch>
  );
}

export default App;
