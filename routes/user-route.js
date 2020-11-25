const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const multer  = require('multer');
const upload = multer();

const fsConstroller = require('../controllers/file-system-controller');

const auth = require('../middleware/auth-middleware');

router.get('/', auth.checkLogin, userController.index);
router.get('/logout', auth.checkLogin, userController.logout);
router.post('/upload', auth.checkLogin, upload.array('files[]', 8), fsConstroller.upload)

module.exports = router;