import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import "./Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
        let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User Logged In");
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User has successfully signed up.");
      }

      console.log(userCredential);
      const token = await userCredential.user.getIdToken();

    // Store token
    localStorage.setItem("token", token);

    console.log("Token:", token);
      history.replace('/home')
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div>
        <form className="auth-form" onSubmit={submitHandler}>
          <h2>{isLogin ? "Login" : "SignUp"}</h2>

          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {!isLogin && (
            <div className="form-control">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button
            className="auth-btn"
            disabled={!email || !password || (!isLogin && !confirmPassword)}
          >
            {isLogin ? "Login" : "Sign up"}
          </button>

          {isLogin && (
            <p className="forgot-password">
              <a href="/">Forgot Password</a>
            </p>
          )}
        </form>

        <div className="toggle-box">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign up</span>
            </>
          ) : (
            <>
              Have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
