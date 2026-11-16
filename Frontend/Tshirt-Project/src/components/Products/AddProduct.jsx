import React from 'react'
import ProductForm from './ProductForm'

function AddProduct({setProducts}) {
  return (
    <ProductForm  setProducts={setProducts}/>
  )
}

export default AddProduct;
