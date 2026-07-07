import React from "react";
import { Link } from "react-router-dom";
import './Products.css';

function ProductItem({ product }) {
 return (
    <div className="product-item">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.title}
          className="product-image"
        />

        <h3 className="product-title">{product.title}</h3>
      </Link>

      <p className="product-price">₹{product.price}</p>

      <button className="product-btn">Add To Cart</button>
    </div>
  );
}

export default ProductItem;