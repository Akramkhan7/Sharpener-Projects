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

module.exports = {
    getAllProducts,
    addProduct,
    getProductById
};
