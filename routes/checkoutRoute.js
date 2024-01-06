const express = require('express');
const router = express.Router();
const checkoutController = require('../src/app/Controllers/CheckoutController');

/* GET home page. */
router.use('/create-checkout', checkoutController.createCheckout)
router.use('/cart', checkoutController.postCheckoutCart)

router.use('/create-buy-now', checkoutController.createCheckoutGs)
router.use('/buy-now', checkoutController.postCheckout)
// router.use('/', checkoutController.GsCheckout)

module.exports = router;