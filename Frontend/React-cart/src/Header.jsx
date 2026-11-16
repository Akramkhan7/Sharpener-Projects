import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from './store';
function Header() {

  const dispatch = useDispatch();

  const cartShowHandler = () =>{
    dispatch(cartActions.toggleCart());
  }

  const cartItems = useSelector((state)=> state.cart.cartItems)

  return (
    <header className="bg-zinc-900 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-5 px-6">
        <h1 className="text-4xl font-bold text-white">
          ReduxCart
        </h1>

        <button className="flex items-center gap-4 border border-emerald-400 rounded-lg px-5 py-2 text-emerald-300 hover:bg-zinc-800"
        onClick={cartShowHandler}
        >
          <span className="font-semibold">
            My Cart
          </span>

          <span className="bg-emerald-400 text-black px-4 py-1 rounded-full font-bold">
            {cartItems}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;