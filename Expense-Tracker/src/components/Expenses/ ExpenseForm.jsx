import React, { useContext, useState } from "react";
import ExpenseContext from "../Store/ExpenseContext";

function ExpenseForm(props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const expenseCtx = useContext(ExpenseContext);


  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      id: Date.now().toString(),
      amount,
      description,
      category,
    };

    expenseCtx.addExpense(expenseData);

    setAmount("");
    setDescription("");
    setCategory("");
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
          className="w-full rounded-md bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
