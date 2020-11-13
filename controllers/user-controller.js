const express = require('express');
const User = require('../models/user-model');
const mongoose = require('mongoose');

function _index(req, res) {
    console.log('test');
}

function _checkEmailPromise(req, res) {
    return new Promise((resolve, reject) => {
        const reqEmail = req.body.email;
        if (reqEmail) {
            User.find({email: reqEmail}, (err, count) => {
                if (err) reject(err); 
                console.log(count);
                if (count.length == 0) {
                    console.log("COUNT "+count.length);
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
        console.log("AFTER AWAIT");
        res.end(promiseResponse);
    } catch (err) {
        console.log(err);
    }
}

function _registerUserPromise(req, res, userData) {
    return new Promise((resolve, reject) => {
        const user = new User(userData);
        console.log(`USERDATA: ${user}`);
        user
            .save()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function _login(req, res) {
    const response =  {
        title: "Moii"
    };
    res.end(JSON.stringify(response));
}

async function _register(req, res) {
    try {
        console.log("BIEM IN REGISTER");
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
    register: _register
}