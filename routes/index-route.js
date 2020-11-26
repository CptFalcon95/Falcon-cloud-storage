const express = require('express');
const userController = require('../controllers/user-controller');
const validationController = require('../controllers/validation-controller');
const indexController = require('../controllers/index-controller');
const router = express.Router();
const auth = require('../middleware/auth-middleware');

router.get('/', auth.checkGuest, indexController.loginForm);
router.post('/login', auth.checkGuest, userController.login);
router.get('/register', auth.checkGuest, indexController.registerForm);
router.post('/register', auth.checkGuest, userController.register);
router.post('/check', auth.checkGuest, validationController.checkCredentials);

module.exports = router;