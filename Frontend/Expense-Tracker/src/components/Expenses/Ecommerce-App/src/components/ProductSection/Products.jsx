import React from "react";
import products from "./productsData";
import ProductItem from "./ProductItem";
import './Products.css';

function Products() {
  return (
    <section className="products">
      <h2 className="products-title">Products</h2>

      <div className="products-container">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Products;