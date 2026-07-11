import React from "react";

function ExpenseItem({ expense }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white p-5 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          ₹{expense.amount}
        </h3>

        <p className="text-gray-600">
          {expense.description}
        </p>
      </div>

      <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
        {expense.category}
      </span>
    </div>
  );
}

export default ExpenseItem;