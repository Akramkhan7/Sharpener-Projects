function CartItem({ item }) {
  return (
    <>
      <div>
        <img src={item.imageUrl} alt={item.title} width="80" />
        <h4>{item.title}</h4>
        <p>₹{item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <button variant="danger">Remove</button>
    </>
  );
}

export default CartItem;
