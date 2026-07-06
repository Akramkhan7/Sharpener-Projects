import Products from "./products";
import ProductItem from "./ProductItem";

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