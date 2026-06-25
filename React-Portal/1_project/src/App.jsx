// Write your code at relevant places in the code below:

import React from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/New Expense/NewExpense";
import { useState } from "react";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Insurance", date: new Date(2023, 7, 15), price: 100 },
    { id: 2, title: "Book", date: new Date(2024, 8, 25), price: 10 },
    { id: 3, title: "Pen", date: new Date(2023, 2, 10), price: 100 },
    { id: 4, title: "Laptop", date: new Date(2025, 9, 17), price: 200 },
  ]);

  const addExpenseHandler = (data) => {
    setExpenses((prev) => {
      return [data, ...prev];
    });

    console.log(expenses);
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );
};

export default App;
