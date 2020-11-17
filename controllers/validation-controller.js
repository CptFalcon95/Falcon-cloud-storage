const express = require('express');
const User = require('../models/user-model');
const mongoose = require('mongoose');

module.exports = {
    checkCredentials,
}

function checkCredentialsPromise(req, res) {
    return new Promise((resolve, reject) => {
        const reqEmail = req.body.email || false;
        const reqName = req.body.name || false;
        if (reqEmail) {
            checkEmail(reqEmail, resolve, reject);
        } else if (reqName) {
            checkName(reqName);
        }
    });
}

async function checkCredentials(req, res) {
    try {
        const promiseResponse = await checkCredentialsPromise(req, res);
        res.end(promiseResponse);
    } catch (err) {
        console.log(err);
    }
}

// TODO Build function to validate characters in the username
function checkName(reqName, resolve, reject) {

}


function checkEmail(reqEmail, resolve, reject) {
    User.find({email: reqEmail}, (err, found) => {
        if (err) reject(err); 
        if (found.length == 0) {
            resolve("OK");
        } else {
            resolve("NOT OK");
        }
    });
}
