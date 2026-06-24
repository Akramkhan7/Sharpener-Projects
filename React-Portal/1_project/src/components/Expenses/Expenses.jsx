import ExpenseItem from "./ExpenseItem";

import Card from "../UI/Card";

function Expenses(props) {
  const expenses = props.expenses || [];

  return (
    <Card>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          date={expense.date}
          price={expense.price}
        />
      ))}
    </Card>
  );
}

export default Expenses;
