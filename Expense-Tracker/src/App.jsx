import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
}

export default App;