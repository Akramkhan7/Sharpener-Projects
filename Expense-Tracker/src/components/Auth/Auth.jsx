import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import "./Auth.css";
import { useHistory } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    if (!isLogin) {
      if (!confirmPassword) {
        alert("Please confirm your password.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
        console.log("Auth successfully");
      
        setConfirmPassword("");
        setEmail("");
        setPassword("");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submitHandler}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="form-control">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!email || !password || (!isLogin && !confirmPassword)}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}

          <span onClick={() => setIsLogin((prev) => !prev)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Auth;
