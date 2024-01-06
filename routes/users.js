var express = require('express');
var router = express.Router();
const usersController = require('../src/app/Controllers/UsersController');

/* GET users listing. */
router.use('/APIadmin', usersController.readOrder)

router.use('/APIcheckout/:id', usersController.getCheckoutGs)

router.put('/APIcarts', usersController.updateCart)
router.delete('/APIcarts/:id', usersController.deleteCart)
router.use('/APIcarts', usersController.APIcart)

router.get('/APIproductsDetail:id', usersController.APIproductDetail)
router.use('/APIproducts', usersController.APIproduct)
router.use('/', usersController.users)


module.exports = router;
