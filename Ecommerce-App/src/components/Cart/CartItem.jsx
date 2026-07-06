function CartItem({ item }) {
  return (
    <>
      <img src={item.imageUrl} alt={item.title} width="80" />
      <h4>{item.title}</h4>
      <p>₹{item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </>
  );
}

export default CartItem;