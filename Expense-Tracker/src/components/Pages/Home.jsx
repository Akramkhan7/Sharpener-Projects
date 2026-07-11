import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center border-b bg-white px-6 py-3">
        <h2 className="text-lg font-semibold">
          Welcome to Expense Tracker!!!
        </h2>

        {/* Small Profile Popup */}
        <div className="flex items-center gap-1  border border-orange-300 bg-orange-50 px-3 py-1 ">
          <span className="text-xs text-gray-700">
            Your profile is incomplete.
          </span>

          <Link to="/profile">
            <button className="text-xs font-medium text-blue-600 ">
              Complete now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;