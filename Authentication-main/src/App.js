import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./components/Store/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/auth">
          <AuthPage />
        </Route>

        <Route path="/profile">
          <UserProfile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
