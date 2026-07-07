import React from "react";
import { Link } from "react-router-dom";
import './Products.css';

function ProductItem({ product }) {
  return (
    <div className="card">

      <img
        src={product.imageUrl}
        alt={product.title}
        className="card-image"
      />

      <div className="card-body">

        <h3>{product.title}</h3>

        <h2>₹ {product.price}</h2>

        <Link to={`/products/${product.id}`}>
          <button>View Details</button>
        </Link>

      </div>

    </div>
  );
}

export default ProductItem;