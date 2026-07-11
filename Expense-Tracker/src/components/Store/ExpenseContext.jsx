import React from 'react'

const ExpenseContext = React.createContext({
    expenses : [],
    storeExpense : () => {},
    addExpense : () => {},
    removeExpense : () => {},
})

export default ExpenseContext
