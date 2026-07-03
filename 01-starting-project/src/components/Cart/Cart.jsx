
import React from 'react'
import classes from "./Cart.module.css"
import Modal from '../UI/Modal'

function Cart() {
    const cartItems = [
       { id:1,
        name:'Sushi',
        amount:2,
        price:13.00,}
    ]
  return (
    <Modal>
      {cartItems.map((item)=>(
        <li key={item.id} className={classes['cart-items']}>
            {item.name}
            <div className={classes.total}>
               <span>Total Amount </span> 
               <span>34.00 </span> 
            </div>
            <div className={classes.actions}>
            <button className={classes['button-alt']}>Close</button>
            <button className={classes.button}>Order</button>
            </div>

        </li>  
      ))}
    </Modal>
  )
}

export default Cart
