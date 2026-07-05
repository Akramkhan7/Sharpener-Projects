import React, { useContext } from "react";
import { useState } from "react";
import CartContext from "../../store/CartContext";

function ProductForm({ setProducts }) {
  const [tshirtName, setTshirtName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [largeQty, setLargeQty] = useState("");
  const [mediumQty, setMediumQty] = useState("");
  const [smallQty, setSmallQty] = useState("");

  const cartCtx = useContext(CartContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      id: Math.random(),
      tshirtName,
      description,
      price,
      largeQty,
      mediumQty,
      smallQty,
    };

    cartCtx.addProduct(data);

    // setTshirtName("");
    // setDescription("");
    // setPrice("");
    // setLargeQty("");
    // setMediumQty("");
    // setSmallQty("");

   
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>T-Shirt Name</label>
      <input
        type="text"
        value={tshirtName}
        onChange={(e) => setTshirtName(e.target.value)}
        placeholder="Enter T-Shirt Name"
      />

      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description"
      />

      <label>Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Price"
      />

      <label>Large</label>
      <input
        type="number"
        value={largeQty}
        onChange={(e) => setLargeQty(e.target.value)}
        placeholder="Large Quantity"
      />

      <label>Medium</label>
      <input
        type="number"
        value={mediumQty}
        onChange={(e) => setMediumQty(e.target.value)}
        placeholder="Medium Quantity"
      />

      <label>Small</label>
      <input
        type="number"
        value={smallQty}
        onChange={(e) => setSmallQty(e.target.value)}
        placeholder="Small Quantity"
      />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
