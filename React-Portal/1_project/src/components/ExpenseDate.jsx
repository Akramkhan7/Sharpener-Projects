import React from 'react'

function ExpenseDate(props) {

    const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


  const month = months[props.date.getMonth()];
  const year = props.date.getFullYear();
  const date = props.date.getDate();


  return (
    <div>
        <div>{month}</div>
        <div>{year}</div>
        <div>{date}</div>
      </div>
  )
}

export default ExpenseDate
