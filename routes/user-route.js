const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const validationController = require('../controllers/validation-controller');
const fsConstroller = require('../controllers/file-system-controller');
var multer  = require('multer');
var upload = multer();

router.get('/logout', userController.logout);
router.get('/login', userController.loginForm);
router.post('/login', userController.login);
router.post('/check', validationController.checkCredentials);
router.get('/register', userController.registerForm);
router.post('/register', userController.register);

router.post('/upload', upload.array('files[]', 8), fsConstroller.upload)

module.exports = router;