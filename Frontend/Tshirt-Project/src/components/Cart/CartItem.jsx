import classes from './Cart.module.css'

function CartItem({ item }) {
  return (
    <div className={classes['cart-item']}>
      <div>
        <h3>{item.tshirtName}</h3>
        <p>
          {item.large > 0 && `${item.large} L `}
          {item.medium > 0 && `${item.medium} M `}
          {item.small > 0 && `${item.small} S `}
        </p>
      </div>

      <p className={classes.price}>
        ₹{(item.large + item.medium + item.small) * item.price}
      </p>
    </div>
  );
}

export default CartItem;