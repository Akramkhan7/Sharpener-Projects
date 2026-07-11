import { sendEmailVerification } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../Firebase/firebase";
import AuthContext from "../Store/AuthContext";

function Home() {
  const api_key = import.meta.env.VITE_FIREBASE_API_KEY;
  const authCtx = useContext(AuthContext);
  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api_key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.idToken,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }
      alert("Verification email has been sent. Please check your inbox.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <h1 className="text-2xl font-bold text-slate-800">Expense Tracker</h1>

          <div className="flex items-center gap-4">
            <Link to="/profile">
              <button className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
                Complete Profile
              </button>
            </Link>

            <button
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 
            "
              onClick={verifyEmailHandler}
            >
              Verify Email
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
