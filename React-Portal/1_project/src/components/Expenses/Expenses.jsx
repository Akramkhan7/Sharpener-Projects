import ExpenseItem from "./ExpenseItem";
import { useState } from "react";
import ExpensesFilter from "./ExpenseFilter";

import Card from "../UI/Card";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("all");

  const changeFilterHandler = (selectYear) => {
    setFilteredYear(selectYear);
  };

  const filteredData = props.expenses.filter((expense) => {
    if (filteredYear === "all") {
      return true;
    }
    return expense.date.getFullYear().toString() === filteredYear;
  });

  

  let expenseContent = "No expense found.";

  return (
    <>
      <ExpensesFilter selected={filteredYear} onChangeFilter={changeFilterHandler} />

      {filteredData.length === 0 ? (
        <p>{expenseContent}</p>
      ) : filteredData.length === 1 ? (
        <>
          {filteredData.map((expense) => (
            <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />
          ))}
          <p>Only one expense found. Please add more</p>
        </>
      ) : (
        filteredData.map((expense) => (
          <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} />
        ))
      )}
    </>
  );
};

export default Expenses;
