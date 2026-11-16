import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./components/Auth.jsx";
import Home from "./components/Pages/Home.jsx";
import ComposeMail from "./components/Pages/ComposeMail.jsx";
import Inbox from "./components/Mail/Inbox.jsx";
import MailDetails from "./components/Pages/MailDetails.jsx";
import SentDetails from "./components/Pages/SentDetails.jsx.jsx"
import Sent from "./components/Pages/Sent.jsx";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Switch>
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/home" /> : <Auth />}
      </Route>

      <Route exact path="/home">
        {isAuthenticated ? <Home /> : <Redirect to="/" />}
      </Route>

      <Route exact path="/compose">
        {isAuthenticated ? <ComposeMail /> : <Redirect to="/" />}
      </Route>

      <Route path="/inbox">
        <Inbox />
      </Route>

      <Route path="/sent/:id">
    <SentDetails />
</Route>

      <Route path="/sent">
    <Sent />
</Route>

      <Route path="/mail/:id">
    <MailDetails />
</Route>

      <Redirect to="/" />
    </Switch>
  );
}

export default App;
