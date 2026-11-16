import React, { useContext } from "react";
import CartContext from "../../store/CartContext";
import classes from "./Products.module.css";

function ProductList() {
  const cartCtx = useContext(CartContext);

  return (
    <ul className={classes["product-list"]}>
      {cartCtx.products.map((product) => (
        <li key={product.id} className={classes["product-item"]}>
          <h3>{product.tshirtName}</h3>
          <p>{product.description}</p>
          <p>₹{product.price}</p>

          <div className={classes["product-buttons"]}>
            <button onClick={() => cartCtx.buyProduct(product.id, "large")}>
              Buy Large ({product.largeQty})
            </button>

            <button onClick={() => cartCtx.buyProduct(product.id, "medium")}>
              Buy Medium ({product.mediumQty})
            </button>

            <button onClick={() => cartCtx.buyProduct(product.id, "small")}>
              Buy Small ({product.smallQty})
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
