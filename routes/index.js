const express = require('express');

const router = express.Router();


const siteRouter = require('./site');
const usersRouter = require('./users');
const productRouter = require('./products');
const authRouter = require('./authRoute');
const cartRouter = require('./cartRoute');


/* GET home page. */
router.use('/cart',cartRouter)

router.use('/auth',authRouter)

router.use('/products', productRouter)

router.use('/users', usersRouter)

router.use('/', siteRouter)

module.exports = router;
