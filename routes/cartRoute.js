const express = require('express');
const router = express.Router();
const cartController = require('../src/app/Controllers/CartController');

/* GET home page. */
router.get('/get-cart', cartController.getCart)
router.post('/add-to-cart', cartController.postCart)
router.use('/', cartController.cart)


module.exports = router;