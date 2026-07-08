import { useState } from "react";
import AuthContext from "./AuthContext"

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");

  const loginHandler = (token) => {
    setToken(token);
  };
  const logOutHandler = () => {
setToken("");
  };

  const value = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;