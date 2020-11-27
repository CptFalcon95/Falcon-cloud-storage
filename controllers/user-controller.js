const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const mongoose = require('mongoose');
const fs = require('./file-system-controller');

module.exports = {
    index,
    login,
    logout,
    register,
    gallery,
}

// Render home page according to login status
async function index(req, res) {
    let user = req.session.auth;
    await fs.getUserFiles({
        owner: user._id, 
        folder: null
    })
    .then(files => {
        res.render('user_admin/index', {
            isAdmin: user.isAdmin,
            userData: user,
            fileData: files
        });
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}

async function gallery(req, res) {
    let user = req.session.auth;
    await fs.getUserFiles({
        owner: user._id, 
        folder: null,
        type: "image"
    })
    .then(files => {
        res.render('user_admin/pictures', {
            isAdmin: user.isAdmin,
            userData: user,
            fileData: files
        });
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}

function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    let failed = true;

    User
    .findOne({email: email})
    .exec()
    .then(user => {
        if (user == null) {
            failed = true;
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                failed = true;
            } 
            if (result) {
                err = false;
                req.session.regenerate((err) => {
                    req.session.auth = user;
                    res.redirect('/user');
                });
            } else {
                res.render('login', {
                    page: 'register',
                    failed: failed,
                });
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.render('login', {
            page: 'login',
            failed: failed,
        });
    });
}

async function register(req, res) {
    try {
        const user = {
            _id: mongoose.Types.ObjectId(),
            // FIXME escaped characters are not rendered in unicode
            name: escape(req.body.name),
            password: bcrypt.hashSync(req.body.password, 10),
            email: escape(req.body.email),
            admin: 0,
            totalStorage: 1
        }
        await registerUserPromise(req, res, user);
        res.status(201)
        .json({
            success: true,
        });
    } catch (err) {
        console.log(err);
    }    
}

function registerUserPromise(req, res, userData) {
    return new Promise((resolve, reject) => {
        const user = new User(userData);
        console.log(user);
        user
        .save()
        .then((result) => {
            fs.createFolder(user._id, true, null);
            resolve(result);
        })
        .catch(err => reject(err));
    });
}

function logout(req, res) {
    req.session.destroy();
    res.redirect('/');
}