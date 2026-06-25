import ExpenseItem from "./ExpenseItem";
import { useState } from "react";
import ExpensesFilter from "./ExpenseFilter";

import Card from "../UI/Card";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2023");

  const changeFilterHandler = (selectYear) => {
    setFilteredYear(selectYear);
  };

  const filteredData = props.expenses.filter((expense)=>{
    return expense.date.getFullYear().toString() === filteredYear;
  })

  return (
    <>
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={changeFilterHandler}
      />
      {filteredData.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          price={expense.price}
          date={expense.date}
        />
      ))}
    </>
  );
};

export default Expenses;
