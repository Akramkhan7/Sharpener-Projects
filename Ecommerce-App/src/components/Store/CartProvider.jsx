import React, { useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const email = localStorage.getItem("email");
  const modifiedEmail = email ? email.replace(/[@.]/g, "") : "";
  const base_url = `https://crudcrud.com/api/2bcd0761c152426bb1d8df51b4cd9121/cart${modifiedEmail}`;

  useEffect(() => {
    if (!email) {
      setItems([]);
      return;
    }

    const fetchCartItems = async () => {
      try {
        const res = await fetch(base_url);
        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCartItems();
  }, [email]);

  const addItemHandler = async (item) => {
    try {
      const res = await fetch(base_url, {
        method: "POST",
        body: JSON.stringify({
          title: item.title,
          price: item.price,
          imageUrl: item.imageUrl,
          quantity: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setItems((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItemHandler = async (item) => {
    if (!item?._id) return;

    try {
      await fetch(`${base_url}/${item._id}`, {
        method: "DELETE",
      });

      setItems((prev) => prev.filter((cartItem) => cartItem._id !== item._id));
    } catch (err) {
      console.log(err);
    }
  };

  const cartContext = {
    items,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
