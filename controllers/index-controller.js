const express = require('express');

module.exports = {
    index
}

function index(req, res) {
    res.render('login', {
        page: 'login',
        failed: false,
    });
}