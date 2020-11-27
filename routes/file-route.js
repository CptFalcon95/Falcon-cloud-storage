const express = require('express');
const fsController = require('../controllers/file-system-controller');
const router = express.Router();

const auth = require('../middleware/auth-middleware');

router.get('/:id', auth.checkAccess, fsController.serveFile);
router.get('/download/:id', auth.checkAccess, fsController.serveDownload);


module.exports = router;