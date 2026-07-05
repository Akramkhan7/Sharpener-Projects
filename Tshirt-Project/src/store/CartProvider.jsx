import react from "react";
import { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addProductHandler = (product) => {
    setProducts((prev) => {
      return [...prev, product];
    });
  };
  const buyProductHandler = (id, size) => {
    const selectedProduct = products.find((product) => product.id === id);

    if (!selectedProduct) return;

    setCartItems.map((prevItems) => {
      const exist = prevItems.find((item) => item.id === id);
      if (exist) {
        return prevItems.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            large: size === "large" ? item.large + 1 : item.large,
            medium: size === "medium" ? item.medium + 1 : item.medium,
            small: size === "small" ? item.small + 1 : item.small,
          };
        });
      }
      return [
        ...prevItems,
        {
          id: selectedProduct.id,
          tshirtName: selectedProduct.tshirtName,
          price: Number(selectedProduct.price),
          large: size === "large" ? 1 : 0,
          medium: size === "medium" ? 1 : 0,
          small: size === "small" ? 1 : 0,
        },
      ];
    });

    //QNY DECREASE

    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== id) {
          return product;
        }

        if (size === "large" && product.largeQty > 0) {
          return {
            ...product,
            largeQty: product.largeQty - 1,
          };
        }

        if (size === "medium" && product.mediumQty > 0) {
          return {
            ...product,
            mediumQty: product.mediumQty - 1,
          };
        }

        if (size === "small" && product.smallQty > 0) {
          return {
            ...product,
            smallQty: product.smallQty - 1,
          };
        }

        return product;
      }),
    );
  };

  const value = {
    products,
    cartItems,
    addProduct: addProductHandler,
    buyProduct: buyProductHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export default CartProvider;
