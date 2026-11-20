const path = require("path");
const productService = require("../services/productService");

const getAllProducts = (req, res) => {
  const result = productService.getAllProducts();
  res.send(result);
};

const addProduct = (req, res) => {
  const result = productService.addProduct();
  res.send(result);
};

const getProductById = (req, res) => {
  const id = req.params.id;
  const result = productService.getProductById(id);
  res.send(result);
};

const getAddProduct = (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', 'view', 'addProduct.html')
);
};

module.exports = {
  getAddProduct,
  getAllProducts,
  addProduct,
  getProductById,
};
