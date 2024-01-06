const express = require('express');
const router = express.Router();
const adminController = require('../src/app/Controllers/AdminController');

/* GET home page. */

router.use('/', adminController.readOrder)

module.exports = router;