import React, { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider(props) {
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(storedToken);

  const LogInHandler = (idToken) => {
    setToken(idToken);
    localStorage.setItem("token", idToken);
  };

  const LogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    idToken: token,
    isLoggedIn: !!token,
    LogIn: LogInHandler,
    LogOut: LogOutHandler,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;