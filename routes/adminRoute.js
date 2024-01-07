const express = require('express');
const router = express.Router();
const adminController = require('../src/app/Controllers/AdminController');
const middleware = require('../src/app/Middleware/auth.middleware')
/* GET home page. */
router.use('/order-detail/:id',middleware.checkAdmin, adminController.readOrderDetail)

router.use('/',middleware.checkAdmin, adminController.readOrder)

module.exports = router;