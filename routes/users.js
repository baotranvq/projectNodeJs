var express = require('express');
var router = express.Router();
const usersController = require('../src/app/Controllers/UsersController');

/* GET users listing. */
router.get('/APIproductsDetail:id', usersController.APIproductDetail)
router.use('/APIproducts', usersController.APIproduct)
router.use('/', usersController.users)


module.exports = router;
