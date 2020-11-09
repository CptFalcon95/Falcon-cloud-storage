const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    res.render('index', {page: 'index'});
});

router.get('/login', (req, res) => {
    res.render('login', {page: 'login'});
});

module.exports = router;