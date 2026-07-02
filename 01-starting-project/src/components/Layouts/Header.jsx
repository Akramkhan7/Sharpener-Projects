import React from 'react'
import classes from './Header.module.css'

function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
            <button>Count Items Count</button>
      </header>
    
      <div className={classes['main-image']}>
        <img  src="https://github.com/academind/react-complete-guide-code/blob/11-practice-food-order-app/extra-files/meals.jpg?raw=true" alt="" />
      </div>
    </>
  )
}

export default Header
