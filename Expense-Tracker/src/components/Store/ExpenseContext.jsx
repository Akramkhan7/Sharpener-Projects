import React from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
  removeExpense: () => {},
  editExpense: () => {},
  updateExpense: () => {},
  editingExpense: null,
  cancelEdit: () => {},
});

export default ExpenseContext;