import { createSlice } from "@reduxjs/toolkit";





const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: localStorage.getItem('expenses') || [],
    totalAmount: 0,
    editingExpense: null,
  },
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;

      state.totalAmount = action.payload.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );
    },

    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.totalAmount += Number(action.payload.amount);
    },

    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );

      state.totalAmount = state.expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );
    },

    editExpense(state, action) {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      if (index !== -1) {
        state.expenses[index] = action.payload;
      }

      state.totalAmount = state.expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );
    },

    startEdit(state, action) {
      state.editingExpense = action.payload;
    },

    cancelEdit(state) {
      state.editingExpense = null;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;