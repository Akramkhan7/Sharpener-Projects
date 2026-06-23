import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate.jsx";
import Expenses from "./Expenses.jsx";



function ExpenseItem(props) {


  return (
    <div className="expense-item">
     <ExpenseDate date={props.date}></ExpenseDate>

     <Expenses title={props.title} price={props.price}></Expenses>
    </div>
  );
}

export default ExpenseItem;
