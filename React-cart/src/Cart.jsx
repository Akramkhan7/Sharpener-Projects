import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./store";

function Cart() {
    const dispatch  = useDispatch();
  const cartShow = useSelector((state) => state.cart.showCart);

  const items = useSelector((state) => state.cart.items);

  if (!cartShow) {
    return null;
  }

  const handlerIncrease = (title) =>{
   dispatch(cartActions.increaseQnty(title));
  }
  const handlerDecrease = (id) =>{
    const item = items.find((item) => item.id == id);
    if(item.quantity === 1){
    dispatch(cartActions.removeItem(id));
      }else{
         dispatch(cartActions.decreaseQnty(id));
      }
    }

  return (
   <div className="max-w-xl mx-auto bg-zinc-900 rounded-lg p-6 shadow-lg">
  <h2 className="text-3xl font-bold text-white mb-6">
    Your Shopping Cart
  </h2>

  <div className="space-y-4">
    {items.map((item) => (
        
      <div
        key={item.id}
        className="bg-zinc-700 rounded-md p-5 flex justify-between items-center"
      >
        <div>
          <h3 className="text-3xl font-bold text-white">
            {item.title}
          </h3>

          <p className="text-xl text-gray-300 mt-2">
            x {item.quantity}
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-white">
          ${item.price * item.quantity}
          </p>


          <p className="text-gray-300 italic">
            (${item.price}/item)
          </p>

          <div className="flex gap-2 justify-end mt-4">
            <button className="border border-white px-4 py-1 rounded text-white" onClick={()=>handlerDecrease(item.id)}>
              -
            </button>

            <button className="border border-white px-4 py-1 rounded text-white" onClick={()=>handlerIncrease(item.title)}>
              +
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default Cart;
