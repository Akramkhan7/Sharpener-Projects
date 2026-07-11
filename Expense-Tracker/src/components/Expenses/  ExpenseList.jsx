import React, { useContext } from "react";
import ExpenseContext from "../Store/ExpenseContext";
import ExpenseItem from "./ ExpenseItem";

function ExpenseList() {
  const expenseCtx = useContext(ExpenseContext);
  console.log(expenseCtx.expenses);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Expenses
      </h2>

      {expenseCtx.expenses?.length === 0 ? (
        <div className="border border-gray-200 rounded-lg bg-white p-6 text-center text-gray-500">
          No expenses added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {expenseCtx.expenses?.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;