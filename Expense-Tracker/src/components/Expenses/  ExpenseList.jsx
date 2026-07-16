import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpenseItem from "./ ExpenseItem";
import { themeActions } from "../Store/Theme-slice";

function ExpenseList() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const premium = useSelector((state) => state.theme.premium);

  const totalExpense = useSelector((state) => state.expenses.totalAmount);

  return (
    <div className="max-w-3xl mx-auto mt-8 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Expense Tracker</h2>

        {totalExpense > 10000 && !premium && (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            onClick={() => dispatch(themeActions.activatePremium())}
          >
            Activate Premium
          </button>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-4">
        Total Expense: ₹{totalExpense}
      </h3>

      {expenses.length === 0 ? (
        <div className="border border-gray-200 rounded-lg bg-white p-6 text-center text-gray-500">
          No expenses added yet.
        </div>
      ) : (
        <div className="space-y-4 pb-5">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </div>
      )}     
    </div>
  );
}

export default ExpenseList;
