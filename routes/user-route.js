const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const multer  = require('multer');
const path  = require('path');

const fsConstroller = require('../controllers/file-system-controller');
const auth = require('../middleware/auth-middleware');

const appDir = path.dirname(require.main.filename);
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `${appDir}/tmp`,);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({
    storage: storage,
});

router.get('/', auth.checkLogin, userController.index);
router.get('/logout', auth.checkLogin, userController.logout);
router.post('/upload', auth.checkLogin, upload.array('files[]', 8), fsConstroller.upload)

module.exports = router;