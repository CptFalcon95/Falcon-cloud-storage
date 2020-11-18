const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const mongoose = require('mongoose');

module.exports = {
    index,
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

function registerUserPromise(req, res, userData) {
    return new Promise((resolve, reject) => {
        const user = new User(userData);
        console.log(user);
        user
            .save()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function login(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email: email}, async (err, user) => {
            if (err) {
                // console.log(err)
            } else {
                const match = await bcrypt.compare(password, user.password || "");
                if (match) {
                    // TODO Set session for user
                    console.log("Match");
                    res.send(true);
                }
                else {
                    console.log("No match");
                    res.send(false);
                }
            }
        }); 
    } catch(err) {
        // console.log(err);
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