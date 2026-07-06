function ProductItem(props) {
  return (
    <>
      <h2>{props.title}</h2>
      <img src={props.imageUrl} alt={props.title} />
      <p>₹{props.price}</p>
      <button>Add To Cart</button>
    </>
  );
}

export default ProductItem;