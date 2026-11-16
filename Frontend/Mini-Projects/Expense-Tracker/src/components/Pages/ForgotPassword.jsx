import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

function ForgotPassword() {
  const emailRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;

    try {
      setIsLoading(true);

      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
        }
      );

      const data = await res.json();

      setIsLoading(false);

      if (!res.ok) {
        throw new Error(data.error.message);
      }

      alert("Password reset link sent successfully. Please check your email.");

      emailRef.current.value = "";
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Forgot Password
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Enter your registered email to receive a password reset link.
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Email Address
            </label>

            <input
              ref={emailRef}
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <CgSpinner className="animate-spin text-xl" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-indigo-600 hover:underline font-medium"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;