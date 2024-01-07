const express = require('express');
const router = express.Router();
const emailController = require('../src/app/Controllers/EmailController');

/* GET home page. */
router.use('/sendEmail/:id',emailController.sendEmail )


module.exports = router;