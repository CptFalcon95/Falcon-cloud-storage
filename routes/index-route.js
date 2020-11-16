const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();
const indexController = require('../controllers/user-controller');

router.get('/', userController.index);
router.get('/register', userController.registerForm);

module.exports = router;