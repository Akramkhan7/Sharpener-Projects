import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import { useState } from "react";
import ExpensesFilter from "./ExpenseFilter";

const ExpenseItem = (props) => {

  return (
    <Card className="expense-item">
      
      <ExpenseDate date={props.date} />

      <div className="expense-item__description">
        <h2>{props.title}</h2>

        <div className="expense-item__price">${props.price}</div>
      </div>
    </Card>
  );
};

export default ExpenseItem;
