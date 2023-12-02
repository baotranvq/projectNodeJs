const express = require('express');

const router = express.Router();


const siteRouter = require('./site');
const usersRouter = require('./users');
const productRouter = require('./products');
const authRouter = require('./authRoute');


/* GET home page. */
router.use('/auth',authRouter)

router.use('/products', productRouter)

router.use('/users', usersRouter)

router.use('/', siteRouter)

module.exports = router;
