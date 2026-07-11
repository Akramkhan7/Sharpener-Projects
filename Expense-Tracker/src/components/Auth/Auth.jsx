import { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../Store/AuthContext";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const authCtx = useContext(AuthContext);

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
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        console.log("User Logged In");
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        console.log("User has successfully signed up.");
      }
      const token = await userCredential.user.getIdToken();

      localStorage.setItem("token", token);

      history.replace("/home");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md">
    <form
      onSubmit={submitHandler}
      className="bg-white shadow-lg rounded-lg p-8 space-y-5"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {!isLogin && (
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!email || !password || (!isLogin && !confirmPassword)}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-md transition"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      {isLogin && (
        <p className="text-center">
          <a
            href="/"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </a>
        </p>
      )}
    </form>

    <div className="mt-6 bg-white shadow rounded-lg p-4 text-center">
      {isLogin ? (
        <p className="text-gray-700">
          Don't have an account?{" "}
          <span
            onClick={() => setIsLogin(false)}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      ) : (
        <p className="text-gray-700">
          Already have an account?{" "}
          <span
            onClick={() => setIsLogin(true)}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      )}
    </div>
  </div>
</div>
  );
}

export default Auth;
