import React, { useContext } from "react";
import CartContext from "../../store/CartContext";

function ProductList() {
  const cartCtx = useContext(CartContext);


  return (
    <ul>
      {cartCtx.products.map((product) => (
        <li key={product.id}>
          <h3>{product.tshirtName}</h3>
          <p>{product.description}</p>
          <p>₹{product.price}</p>

          <button onClick={() => cartCtx.buyProduct(product.id, "large")}>
            Buy Large ({product.largeQty})
          </button>

          <button onClick={() => cartCtx.buyProduct(product.id, "medium")}>
            Buy Medium ({product.mediumQty})
          </button>

          <button onClick={() => cartCtx.buyProduct(product.id, "small")}>
            Buy Small ({product.smallQty})
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
