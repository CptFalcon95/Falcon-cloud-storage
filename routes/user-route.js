const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/', userController.index);
router.post('/login', userController.login);
router.post('/check', userController.checkEmail);
router.post('/register', userController.register);

module.exports = router;