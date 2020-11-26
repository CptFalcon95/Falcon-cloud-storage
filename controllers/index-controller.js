const express = require('express');

module.exports = {
    loginForm,
    registerForm
}

function registerForm(req,res) {
    res.render('register', {
        page: 'register',
    });
}

function loginForm(req, res) {
    res.render('login', {
        page: 'login',
        failed: false,
    });
}
