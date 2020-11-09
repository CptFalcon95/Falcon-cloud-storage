const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', (req, res) => {
    console.log('test');
});

router.post('/login', (req, res) => {
    const response =  {
        title: "Moii"
    };
    res.end(JSON.stringify(response));
});

// Function to check creds via AJAX call from Client side authentication. Check for email exists
// Make a the AJAX call in ES6 on client. Make the whole form using AJAX.
router.post('/checkCreds', (req, res) => {
    const response =  {
        title: "Moii"
    };
    res.end(JSON.stringify(response));
});

router.post('/register', (req, res) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        admin: 0,
        totalStorage: 1
    });
    // user
    //     .save()
    //     .then(result => {
    //         console.log(result);
    //     })
    //     .catch(err => console.log(err));
    // res.status(201).json({
    //     message: "Created User",
    //     createdUser: user,
    // });
    console.log(JSON.stringify(user));
});

module.exports = router;