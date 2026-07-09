import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


import classes from "./Login.module.css";
import AuthContext from "../Store/AuthContext";

function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  console.log(import.meta.env);
  const authCtx = useContext(AuthContext);
   const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

   console.log(API_KEY);

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
   


     try {
      const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,{
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
             'Content-Type': 'application/json',
            }
          })
          const data = await res.json();
          if(res.ok){
            localStorage.setItem('token',data.idToken);
            authCtx.login(data.idToken);
            history.replace('/products');
          }else{
            alert(data.error.message);
          }
      } catch (err) {
        alert(err.message);
      }

  };
  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <p>Sending Request...</p>
          ) : (
            <button type="submit">Login</button>
          )}
         
        </div>
      </form>
    </section>
  );
}

export default Login;
