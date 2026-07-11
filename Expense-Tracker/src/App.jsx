import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import AuthContext from "./components/Store/AuthContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/" exact component={Auth} />

      <Route path="/home">
        {authCtx.idToken ? <Home /> : <Redirect to="/" />}
      </Route>

      <Route path="/profile">
        {authCtx.idToken ? <Profile /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
}

export default App;
