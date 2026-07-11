import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import AuthContext from "./components/Store/AuthContext";
import ForgotPassword from "./components/Pages/ForgotPassword";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Route path="/forgot-password" exact component={ForgotPassword} />

      <Route path="/profile">
        {authCtx.idToken ? <Profile /> : <Redirect to="/auth" />}
      </Route>

      <Route path="/">
        {authCtx.idToken ? <Home /> : <Redirect to="/auth" />}
      </Route>
    </Switch>
  );
}

export default App;
