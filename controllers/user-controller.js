const express = require('express');
const User = require('../models/user-model');
const mongoose = require('mongoose');

function _index(req, res) {
    // loggedIn is set hard, later replaced by authorization
    // TODO Replace with authorization
    // let currentUser = _getCurrentUser();
    let loggedIn = true;
    if(!loggedIn)
     {
        res.render('login', {
            page: 'login'
        });
     }
     else {
        // For future use:
        // res.render('user_admin/index', {
        //     loggedIn: currentUser.loggedIn,
        //     isAdmin: currentUser.isAdmin,
        //     userData: currentUser.data
        // });
        res.render('user_admin/index');
     }
}

function _getCurrentUser(req,res) {

}

function _registerForm(req,res) {
    res.render('register', {
        page: 'register'
    });
}

function _checkEmailPromise(req, res) {
    return new Promise((resolve, reject) => {
        const reqEmail = req.body.email;
        if (reqEmail) {
            User.find({email: reqEmail}, (err, found) => {
                if (err) reject(err); 
                if (found.length == 0) {
                    resolve("OK");
                } else {
                    resolve("NOT OK");
                }
            });
        }
    });
}

async function _checkEmail(req, res) {
    try {
        const promiseResponse = await _checkEmailPromise(req, res);
        res.end(promiseResponse);
    } catch (err) {
        console.log(err);
    }
}

function _registerUserPromise(req, res, userData) {
    return new Promise((resolve, reject) => {
        const user = new User(userData);
        user
            .save()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function _login(req, res) {
    const response =  {
        title: 'test'
    };
    res.end(JSON.stringify(response));
}

async function _register(req, res) {
    try {
        const user = {
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            admin: 0,
            totalStorage: 1
        }
        const promiseResponse = await _registerUserPromise(req, res, user);
        res.status(201)
        .json({
            success: true,
            createdUser: promiseResponse,
        }).end();
        
    } catch (err) {
        console.log(err);
    }    
}

module.exports = {
    index: _index,
    checkEmail: _checkEmail,
    login: _login,
    register: _register,
    registerForm: _registerForm
}