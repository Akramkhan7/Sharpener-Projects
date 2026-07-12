import React from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../Store/Expense-slice";

function ExpenseItem({ expense }) {
  const dispatch = useDispatch();

  const editHandler = () => {
    dispatch(expenseActions.startEdit(expense));
  };

  const deleteHandler = () => {
    dispatch(expenseActions.deleteExpense(expense.id));
  };

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-5">
      <div>
        <h3 className="text-xl font-bold text-gray-800">
          ₹{expense.amount}
        </h3>

        <p className="mt-1 text-gray-600">
          {expense.description}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          {expense.category}
        </span>

        <div className="flex gap-2">
          <button
            className="rounded-md border border-yellow-500 px-4 py-2 text-sm font-medium text-yellow-600 hover:bg-yellow-500 hover:text-white"
            onClick={editHandler}
          >
            Edit
          </button>

          <button
            className="rounded-md border border-red-500 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-500 hover:text-white"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;