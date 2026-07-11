 import React from "react";

const AuthContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  LogIn: () => {},
  LogOut: () => {},
});

export default AuthContext;