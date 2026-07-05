import React from 'react'
import Header from './components/Layouts/Header'
import AddProduct from './components/Products/AddProduct';
import ProductList from './components/Products/ProductList';
import { useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  return (
    <>
   <Header />
<AddProduct />
<ProductList />

      
    </>
  )
}

export default App
