import React, { useEffect, useState } from "react";
import ExpenseContext from "./ExpenseContext";

function ExpenseProvider(props) {
  const [expenses, setExpenses] = useState([]);
  const api_key = import.meta.env.VITE_FIREBASE_DB_URL;

  const StoreExpenseHandler = () => {};

  const addExpenseHandler = (expense) => {
    console.log(expense);
    setExpenses((prevExpense) => {
      return [...prevExpense, expense];
    });
  };

  const removeExpenseHandler = async (id) => {
    try {
      const res = await fetch(`${api_key}/expense/${id}.json`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete expense");
      }

      const data = await res.json();

      setExpenses((prevExpense) =>
        prevExpense.filter((expense) => expense.id !== id),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const editExpenseHandler = async (id) =>{
    try{
        const res = await fetch(`${api_key}/`)
    }catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(`${api_key}/expense.json`);

        if (!res.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await res.json();

        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
        }

        setExpenses(loadedExpenses);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExpenses();
  }, []);

  const value = {
    expenses,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    editExpense : editExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={value}>
      {props.children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider;
