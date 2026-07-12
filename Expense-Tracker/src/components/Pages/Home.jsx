import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../Layout/Header";
import ExpenseForm from "../Expenses/ ExpenseForm";
import ExpenseList from "../Expenses/  ExpenseList";
import { expenseActions } from "../Store/Expense-slice";

function Home() {
  const api_key = import.meta.env.VITE_FIREBASE_DB_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch(`${api_key}/expense.json`);

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      let loadedExpenses = [];


      for(const key in data){
        loadedExpenses.push({
          id : key,
          ...data[key],
        })
      };

      dispatch(expenseActions.setExpenses(loadedExpenses));
    };

    fetchExpenses();
  }, [dispatch]);
  return (
    <>
      <Header />
      <ExpenseForm />
      <ExpenseList />
    </>
  );
}

export default Home;
