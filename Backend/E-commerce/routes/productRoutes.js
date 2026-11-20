const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    getAddProduct,
    postProduct
} = require('../controllers/productController');

router.get('/', getAllProducts);

router.get('/addProduct', getAddProduct);

router.post('/', postProduct);

router.get('/:id', getProductById);

module.exports = router;