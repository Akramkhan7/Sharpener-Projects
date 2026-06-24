import ExpenseDate from "./ExpenseDate";
import Card from "./Card";
import "./ExpenseItem.css";
import { useState } from "react";


const ExpenseItem = (props)=> {

const [title, setTitle] = useState(props.title);

function changeTitle(){
  console.log("button clicked");
  setTitle('New Title');
}

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />

      <div className="expense-item__description">
        <h2>{title}</h2>

        <div className="expense-item__price">${props.price}</div>
        <button onClick={changeTitle} >Change title</button>
      </div>
    </Card>
  );
}

export default ExpenseItem;
