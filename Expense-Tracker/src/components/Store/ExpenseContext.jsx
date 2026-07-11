import React from 'react'

const ExpenseContext = React.createContext({
    expenses : [],
    addExpense : () => {},
    removeExpense : () => {},
    editExpense : () => {}.
})

export default ExpenseContext
