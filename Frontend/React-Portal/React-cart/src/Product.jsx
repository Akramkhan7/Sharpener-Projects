import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./store";
function Product({ id,title, price, description }) {
   
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const addToCartHandler = () => {
     const exist = items.find((item) => item.id === id);
    if (exist) {
        dispatch(cartActions.increaseQnty(id)); 
    } else {
      dispatch(
        cartActions.addItem({
          id,
          title,
          price: parseFloat(price.replace("$", "")),
          description,
          quantity: 1,
        }),
      );
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 flex justify-between items-center shadow-lg">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>

        <p className="text-gray-600 mt-3">{description}</p>
      </div>

      <div className="flex flex-col items-end gap-5">
        <span className="bg-zinc-900 text-white px-8 py-2 rounded-full text-2xl">
          {price}
        </span>

        <button
          onClick={addToCartHandler}
          className="border border-sky-500 text-sky-500 px-6 py-2 rounded hover:bg-sky-500 hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
