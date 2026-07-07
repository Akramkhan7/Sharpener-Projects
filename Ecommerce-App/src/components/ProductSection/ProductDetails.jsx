import React from "react";
import Products from "./Products";
import products from "./productsData";
import './Products.css';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ProductDetails() {
  const { productId } = useParams();

  const product = products.find((product) => product.id === productId);
  if (!product) {
    return <h2>Product Not Found</h2>;
  }
   return (
    <div className="product-details">
      <h2>{product.title}</h2>

      <div className="product-images">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={product.title} />
        ))}
      </div>

      <h3>Reviews</h3>

      <ul className="reviews">
        {product.reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDetails;