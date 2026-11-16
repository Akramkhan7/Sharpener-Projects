import React from "react";
import Chart from "../Chart/Chart";

const ChartExpense = (props) => {
  return (
    <div>
      <Chart expensesData={props.chartData} />
    </div>
  );
};

export default ChartExpense;
