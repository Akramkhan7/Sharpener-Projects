import React from "react";
import { useState } from "react";
import List from "../List/List";

function Form() {
  const [data, setData] = useState([]);
  const [vegName, setVegName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [buyValues, setBuyValues] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const temp = {
      id: Math.random(),
      vegName: vegName,
      price: price,
      quantity: quantity,
    };

    setData((prev) => {
      return [temp, ...prev];
    });
    setPrice('');
    setVegName('');
    setQuantity('');
  };

  const onDeleteHandler = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const onBuyHandler = (id) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const buyQty = buyValues[id] || 0;

          if (buyQty > Number(item.quantity)) {
            return item;
          }

          return {
            ...item,
            quantity: Number(item.quantity) - buyQty,
          };
        }

        return item;
      }),
    );
  };

  const handleBuyInput = (id, value) => {
    setBuyValues((prev) => ({
      ...prev,
      [id]: Number(value),
    }));
  };

  return (
   <div className="container">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          value={vegName}
          onChange={(e) => setVegName(e.target.value)}
          placeholder="ex-potatoes"
        />

        <label htmlFor="">Price</label>
        <input
          type="number"
          name=""
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0"
        />

        <label htmlFor="">Quantity</label>
        <input
          type="number"
          name=""
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="ex-5kg"
        />

        <button type="submit">Add to Shop</button>
      </form>
      <List
        formData={data}
        onDelete={onDeleteHandler}
        onBuy={onBuyHandler}
        handleInput={handleBuyInput}
      />
    </div>
  );
}

export default Form;
