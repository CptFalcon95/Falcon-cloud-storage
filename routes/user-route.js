const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const multer  = require('multer');
const path  = require('path');

const fsConstroller = require('../controllers/file-system-controller');
const auth = require('../middleware/auth-middleware');

const appDir = path.dirname(require.main.filename);
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${appDir}/tmp`,);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const checkFile = fsConstroller.checkFileType(file.mimetype);
        if (checkFile.ok == false) {
            return cb(new Error(`Wrong file typ: ${checkFile.file}`));
        }
        cb(null, true)
    }
});

router.get('/', auth.checkLogin, userController.index);
router.get('/logout', auth.checkLogin, userController.logout);
router.post('/upload', auth.checkLogin, upload.array('files[]', 8), fsConstroller.storeFiles)

module.exports = router;