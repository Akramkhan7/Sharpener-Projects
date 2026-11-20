
const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    addProduct,
    getProductById,
    getAddProduct,
} = require('../controllers/productController');

router.get('/', getAllProducts);

router.post('/', addProduct);

// Specific route first
router.get('/addProduct', getAddProduct);

// Dynamic route last
router.get('/:id', getProductById);

module.exports = router;
