const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    res.render('login', {
        page: 'login'
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        page: 'register'
    });
});

module.exports = router;