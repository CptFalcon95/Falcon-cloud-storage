const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const validationController = require('../controllers/validation-controller');

router.get('/', userController.index);
router.post('/login', userController.login);
router.post('/check', validationController.checkCredentials);
router.post('/register', userController.register);

module.exports = router;