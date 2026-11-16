import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { use, useContext, useEffect } from "react";
import AuthContext from "./components/Store/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);
  const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;


  //auto logout
useEffect(() => {
    if (!authCtx.token) return;
    const expireTime = localStorage.getItem("expireTime");
    const currentTime = new Date().getTime();
    if (currentTime > expireTime) {
      authCtx.logout();
    }
  }
, [authCtx]);

  useEffect(() => {
    if (!authCtx.token) return;
    try {
      const checkToken = async () => {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!res.ok) {
          authCtx.logout();
        }
      };
    } catch (err) {
      authCtx.logout();
    }
  }, [authCtx]);


  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/auth">
          {!authCtx.isLoggedIn ? <AuthPage /> : <Redirect to="/profile" />}
        </Route>

        <Route path="/profile">
          {authCtx.isLoggedIn ? <UserProfile /> : <Redirect to="/auth" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
