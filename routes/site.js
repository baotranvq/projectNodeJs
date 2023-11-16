const express = require('express');
const router = express.Router();
const siteController = require('../src/app/Controllers/SiteController');

/* GET home page. */

router.use('/contact', siteController.contact)
router.use('/', siteController.index)

module.exports = router;
