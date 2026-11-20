const path = require("path");
const productService = require("../services/productService");
const { sendResponse } = require("../utils/response");

const getAllProducts = (req, res) => {
  const result = productService.getAllProducts();
  sendResponse(res,result,200)
};

const addProduct = (req, res) => {
  const result = productService.addProduct();
 sendResponse(res,result,201)
};

const getProductById = (req, res) => {
  const id = req.params.id;
  const result = productService.getProductById(id);
  sendResponse(res,result,200)
};

const postProduct = (req, res) => {
   const data = req.body;
   res.json({value: data.productName })
};

const getAddProduct = (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', 'view', 'addProduct.html')
);
};

module.exports = {
    postProduct,
  getAddProduct,
  getAllProducts,
  addProduct,
  getProductById,
};
