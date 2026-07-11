import React, { useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";

function ForgotPassword() {
  const [isLoading, setLoading] = useState(false);
  const emailRef = useRef();

  const api_key = import.meta.env.VITE_FIREBASE_API_KEY;

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;

    try {
      setLoading(true);
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api_key}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      console.log(data);
      alert("Password reset link sent. ");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            ref={emailRef}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-md flex justify-center items-center gap-2 disabled:bg-indigo-400"
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
      </div>
    </div>
  );
}

export default ForgotPassword;
