import React from "react";
import { useState } from "react";

function List({ formData, onDelete, onBuy, handleInput }) {
  return (
    <ul>
      {formData.map((item, i) => (
        <li key={item.id}>
          {item.vegName} - Rs. {item.price} - {item.quantity} Kg
          <input
            type="number"
            onChange={(e) => handleInput(item.id, e.target.value)}
          />
          <button onClick={() => onBuy(item.id)}>Buy</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
