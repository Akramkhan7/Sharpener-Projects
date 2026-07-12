import React, { useContext } from "react";
import { useSelector } from "react-redux";
import ExpenseItem from "./ ExpenseItem";

function ExpenseList() {
  const expenses = useSelector((state) => state.expenses.expenses);
  console.log(expenses);
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Expenses</h2>

      {expenses?.length === 0 ? (
        <div className="border border-gray-200 rounded-lg bg-white p-6 text-center text-gray-500">
          No expenses added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {expenses?.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
