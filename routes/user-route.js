const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const validationController = require('../controllers/validation-controller');
const passport = require('passport');

router.get('/logout', userController.logout);
router.get('/login', userController.loginForm);
router.post('/login', userController.login);
router.post('/check', validationController.checkCredentials);
router.get('/register', userController.registerForm);
router.post('/register', userController.register);

module.exports = router;