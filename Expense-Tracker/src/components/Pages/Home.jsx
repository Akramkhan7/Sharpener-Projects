import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Layout/Header";
import ExpenseForm from "../Expenses/ ExpenseForm";
import ExpenseList from "../Expenses/  ExpenseList";
import { expenseActions } from "../Store/Expense-slice";

function Home() {
  const api_key = import.meta.env.VITE_FIREBASE_DB_URL;
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch(`${api_key}/expense/${userId}.json`);

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      if (!data) {
        dispatch(expenseActions.setExpenses([]));
        return;
      }

      let loadedExpenses = [];

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          ...data[key],
        });
      }

      dispatch(expenseActions.setExpenses(loadedExpenses));
    };

    fetchExpenses();
  }, [dispatch]);
  return (
    <div
      className={
        darkMode ? "dark-theme min-h-screen" : "light-theme min-h-screen"
      }
    >
      <Header />
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}

export default Home;
