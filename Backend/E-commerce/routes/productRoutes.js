
const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    addProduct,
    getProductById,
    getProductsByUser
} = require('../controllers/productController');

router.get('/', getAllProducts);

router.post('/', addProduct);

// Specific route first
router.get('/page', getProductsByUser);

// Dynamic route last
router.get('/:id', getProductById);

module.exports = router;
