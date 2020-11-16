const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const mongoose = require('mongoose');

module.exports = {
    index,
    checkEmail,
    login,
    register,
    registerForm
}

function index(req, res) {
    // loggedIn is set hard, later replaced by authorization
    // TODO Replace with authorization
    // let currentUser = _getCurrentUser();
    let loggedIn = false;
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

function getCurrentUser(req,res) {

}

function registerForm(req,res) {
    res.render('register', {
        page: 'register'
    });
}

function checkEmailPromise(req, res) {
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

async function checkEmail(req, res) {
    try {
        const promiseResponse = await checkEmailPromise(req, res);
        res.end(promiseResponse);
    } catch (err) {
        console.log(err);
    }
}

function registerUserPromise(req, res, userData) {
    return new Promise((resolve, reject) => {
        const user = new User(userData);
        user
            .save()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function login(req, res) {
    try {       
        const reqEmail = req.body.email;
        if (reqEmail) {
            User.findOne({email: reqEmail}, async (err, user) => {
                if (err) reject(err); 
                const match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    console.log("macth");
                }      
            });
        }
    } catch(err) {
        console.log(err);
    }
}

async function register(req, res) {
    try {
        const user = {
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            admin: 0,
            totalStorage: 1
        }
        const promiseResponse = await registerUserPromise(req, res, user);
        res.status(201)
        .json({
            success: true,
            createdUser: promiseResponse,
        }).end();
        
    } catch (err) {
        console.log(err);
    }    
}