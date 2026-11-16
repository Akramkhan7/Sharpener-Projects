import Header from "./Header";
import Cart from "./Cart";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useRef, useState } from "react";
import Notification from "./Notification";
import { uiActions } from "./ui-slice";
import { cartActions, sendCartData } from "./store";

function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    dispatch(sendCartData(cart));
    // const sendData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "pending",
    //       title: "Sending...",
    //       message: "Sending cart data!",
    //     }),
    //   );
    //   try {
    //     const res = await fetch(
    //       "https://expense-tracker-a04e2-default-rtdb.firebaseio.com/cart.json",
    //       {
    //         method: "PUT",
    //         body: JSON.stringify(cart),
    //       },
    //     );

    //     if (!res.ok) {
    //       throw new Error("error occur");
    //     }

    //     dispatch(
    //       uiActions.showNotification({
    //         status: "success",
    //         title: "Success!",
    //         message: "Cart data sent successfully.",
    //       }),
    //     );
    //   } catch (err) {
    //     dispatch(
    //       uiActions.showNotification({
    //         status: "error",
    //         title: "Error!",
    //         message: "Sending cart data failed.",
    //       }),
    //     );
    //   }
    // };

   
  }, [cart, dispatch]);


  const fetchData = async () =>{
    try{
      const res = await fetch(`https://expense-tracker-a04e2-default-rtdb.firebaseio.com/cart.json`,{
        method : 'GET',
      })

      const data = await res.json();
      console.log(data);

      dispatch(cartActions.replaceCart(data));
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div className="min-h-screen bg-zinc-800">
      <Notification />
      <Header />

      <main className="max-w-5xl mx-auto py-10">
        <Cart />

        <h2 className="text-center text-3xl font-bold text-white mt-14 mb-10 uppercase">
          Buy Your Favorite Products
        </h2>

        <div className="space-y-8">
          <Product
            id={1}
            title="Test"
            price="$6.00"
            description="This is a first product - amazing!"
          />

          <Product
           id={2}
            title="Second Product"
            price="$12.00"
            description="This is another awesome product."
          />
        </div>
      </main>
    </div>
  );
}

export default App;
