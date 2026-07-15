import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../Store/Expense-slice";
import { CgSpinner } from "react-icons/cg";

function ExpenseForm(props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_FIREBASE_DB_URL;
  const dispatch = useDispatch();

  const editingExpense = useSelector((state) => state.expenses.editingExpense);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setDescription(editingExpense.description);
      setCategory(editingExpense.category);
    }
  }, [editingExpense]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      description,
      category,
    };

    if (!editingExpense) {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_KEY}/expense/${userId}.json`, {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to add expense");
        }

        const data = await res.json();
        dispatch(
          expenseActions.addExpense({
            id: data.name,
            ...expenseData,
          }),
        );

        setAmount("");
        setCategory("");
        setDescription("");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      // for updating exist expenses
      try {
        setIsLoading(true);
        const res = await fetch(
          `${API_KEY}/expense/${userId}/${editingExpense.id}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount,
              description,
              category,
            }),
          },
        );

        if (!res.ok) {
          throw new Error("Failed to update expense");
        }

        // update local state

        dispatch(
          expenseActions.editExpense({
            id: editingExpense.id,
            amount,
            description,
            category,
          }),
        );
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        dispatch(expenseActions.cancelEdit());
        setAmount("");
        setDescription("");
        setCategory("");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 border border-gray-200 rounded-lg bg-white p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</h2>

      <form onSubmit={submitHandler} className="space-y-6">
        {/* Money Spent */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Money Spent
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>

          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-600"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Movie">Movie</option>
            <option value="Medical">Medical</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 flex justify-center items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CgSpinner className="animate-spin text-xl" />
              <span>{editingExpense ? "Updating..." : "Adding..."}</span>
            </>
          ) : editingExpense ? (
            "Update Expense"
          ) : (
            "Add Expense"
          )}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
