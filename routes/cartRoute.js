const express = require('express');
const router = express.Router();
const cartController = require('../src/app/Controllers/CartController');
const middleware = require('../src/app/Middleware/auth.middleware')

/* GET home page. */
router.get('/get-cart', cartController.getCart)
router.post('/add-to-cart',middleware.loggedIn ,cartController.postCart)
router.use('/',middleware.loggedIn, cartController.cart)


module.exports = router;