import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
  const storedToken = useState(localStorage.getItem("token"));
  const [token, setToken] = useState(storedToken);


  const loginHandler = (token) => {
    setToken(token);
  };
  const logOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    setToken(null);
  };

  const value = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
