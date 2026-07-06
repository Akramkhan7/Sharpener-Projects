import { useContext } from "react";
import CartContext from "../Store/CartContext";

function ProductItem(props) {
  const cartCtx = useContext(CartContext);

  function addToCartHandler (){
    cartCtx.addItem({
      title: props.title,
      price: props.price,
      imageUrl: props.imageUrl,
    });
  };
  return (
    <>
      <h2>{props.title}</h2>
      <img src={props.imageUrl} alt={props.title} />
      <p>₹{props.price}</p>
      <button onClick={addToCartHandler}>Add To Cart</button>
    </>
  );
}

export default ProductItem;
