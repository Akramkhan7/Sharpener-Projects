import React from "react";

import Header from "../Layout/Header";
import ExpenseForm from "../Expenses/ ExpenseForm";
import ExpenseList from "../Expenses/  ExpenseList";

function Home() {
  return (
    <>
      <Header />
      <ExpenseForm />
      <ExpenseList  />
    </>
  );
}

export default Home;
