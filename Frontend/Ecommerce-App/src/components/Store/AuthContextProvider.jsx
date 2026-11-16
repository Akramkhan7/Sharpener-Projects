import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
  const storedToken = useState(localStorage.getItem("token"));
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    let t = localStorage.getItem("token");
    if (!t) return setToken(null);
  }, [token]);
  
  const loginHandler = (token) => {
    setToken(token);
  };

  const value = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
