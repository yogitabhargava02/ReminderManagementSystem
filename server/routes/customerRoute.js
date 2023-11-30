const express = require('express');
const router = express.Router();
const { customerRegister } = require('../controllers/auth/Customer/customerRegister');
const { customerLogin } = require('../controllers/auth/Customer/customerLogin');
const { initiateForgotPassword } = require('../controllers/auth/Customer/customerForgot');
const customerResetPasswordController = require('../controllers/auth/Customer/customerReset');
const { getCustomerUsername } = require('../controllers/auth/Customer/customerRegister');

router.post('/reset-password', customerResetPasswordController.resetPassword);
router.post('/forgot-password', initiateForgotPassword);
router.post('/cregister', customerRegister);
router.post('/clogin', customerLogin);
router.get('/get-username', getCustomerUsername);

module.exports = router;
