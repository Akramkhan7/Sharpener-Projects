import Products from "./products.js";
import ProductItem from "./ProductItem.jsx";

function ProductList() {
  return (
    <>
      {Products.map((product) => (
        <ProductItem
          title={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </>
  );
}

export default ProductList;