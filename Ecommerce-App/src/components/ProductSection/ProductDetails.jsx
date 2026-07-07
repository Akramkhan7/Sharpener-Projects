import React from "react";
import { useParams } from "react-router-dom";
import products from "./productsData";
import "./Products.css";

function ProductDetails() {
  const { productId } = useParams();

  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <section className="product-details">
      <section className="product-images">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={product.title}
          />
        ))}
      </section>

      <section className="review-section">
        <h2>Customer Reviews</h2>

        <section className="review-container">
          {product.reviews.map((review, index) => (
            <article className="review-card" key={index}>
              <header className="review-top">
                <span className="rating">
                  {review.rating} ★
                </span>

                <h4>{review.title}</h4>

                <span className="time">
                  {review.time}
                </span>
              </header>

              <p className="comment">
                {review.comment}
              </p>
            </article>
          ))}
        </section>
      </section>
    </section>
  );
}

export default ProductDetails;