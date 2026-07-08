import { useState, useRef, useContext, useEffect } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../Store/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  useEffect(()=>{
    localStorage.setItem('token',authCtx.token);
  },[authCtx.token])

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
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
            history.replace('/profile');
          }else{
            alert(data.error.message);
          }
      } catch (err) {
        alert(err.message);
      }
       
    } else {
      setIsLoading(true);

      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();

        setIsLoading(false);

        if (res.ok) {
          console.log(data);
        } else {
          alert(data.error.message);
        }
      } catch (err) {
        setIsLoading(false);
        alert(err.message);
      }
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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
            <button type="submit">
              {isLogin ?  "Login" : "Create Account" }
            </button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
