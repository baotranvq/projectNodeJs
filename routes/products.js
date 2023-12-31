const express = require('express');
const router = express.Router();
const productController = require('../src/app/Controllers/ProductController');

/* GET home page. */
router.use('/search', productController.search)
router.use('/men-jordan-shoes', productController.menJordanShoes)
router.use('/detail/:id', productController.detail)
router.use('/', productController.product)

module.exports = router;
