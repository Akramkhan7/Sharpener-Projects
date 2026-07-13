import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Auth-slice";
import { themeActions } from "../Store/Theme-slice";
import { expenseActions } from "../Store/Expense-slice";

function Header() {
  const api_key = import.meta.env.VITE_FIREBASE_API_KEY;

  const dispatch = useDispatch();
  const history = useHistory();

  const token = useSelector((state) => state.auth.token);
  const premium = useSelector((state) => state.theme.premium);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const expenses = useSelector((state) => state.expenses.expenses);

  const downloadCsv = () => {
    const headers = ["Amount,Description,Category"];
    const rows = expenses.map((expense) => {
     return `${expense.amount},${expense.description},${expense.category}`;
    });

    const csv = [...headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";

    a.click();
    window.URL.revokeObjectURL(url);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/auth");
  };

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
            idToken: token,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      alert("Verification email has been sent.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <h1 id="header-h1" className="text-2xl font-bold text-slate-800">
          Expense Tracker
        </h1>

        <div className="flex items-center gap-4">
          {premium && (
            <button
              onClick={downloadCsv}
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
            >
              Download CSV
            </button>
          )}
          {premium && (
            <button
              onClick={() => dispatch(themeActions.toggleTheme())}
              className="text-2xl text-slate-700 hover:text-indigo-600"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          )}

         <Link to="/profile">
            <button className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
              Complete Profile
            </button>
          </Link>

          <button
            onClick={verifyEmailHandler}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Verify Email
          </button>

          <button
            onClick={logoutHandler}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
