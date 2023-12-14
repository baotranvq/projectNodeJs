const express = require('express');
const router = express.Router();
const registerController = require('../src/app/Controllers/auth/registerController');
const loginController = require('../src/app/Controllers/auth//loginController');
const middleware = require('../src/app/Middleware/auth.middleware')
const validate = require('../src/app/Validate/auth.validate');



router.post('/postRegister', registerController.postRegister)
router.use('/register',middleware.isAuth, registerController.register)

router.post('/postLogin', loginController.postLogin)
router.use('/login',middleware.isAuth , loginController.login)

router.use('/logout',middleware.loggedIn ,loginController.logout)
router.use('/getsession', loginController.getSession)





module.exports = router;