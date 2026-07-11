import React, { useState } from "react";
import ExpenseContext from "./ExpenseContext";

function ExpenseProvider(props) {

  const [expenses, setExpenses] = useState([]);

  const StoreExpenseHandler = () => {};

  const addExpenseHandler = (expense) => {
    console.log(expense);
    setExpenses((prevExpense) => {
      return [...prevExpense, expense];
    });
  };

  const removeExpenseHandler = () => {};

  const value = {
    expenses,
    storeExpense: StoreExpenseHandler,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={value}>
      {props.children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider;
