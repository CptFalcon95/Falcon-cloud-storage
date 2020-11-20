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
            checkName(reqName, resolve, reject);
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

function checkName(reqName, resolve, reject) {
    try {
        const regexPattern = /[A-Za-z0-9_-]+/;
        const regex = new RegExp(regexPattern);
        if(regex.test(reqName)) {
            resolve("OK");
        } else {
            resolve("NOT OK");
        }
    } catch(err) {
        console.log(err);
        reject("NOT OK");        
    }
}


// Check if email is already present in the database, and test it with a regex.
function checkEmail(reqEmail, resolve, reject) {
    try {
        User.find({email: reqEmail}, (err, found) => {
            if (err) reject(err); 
            if (found.length == 0) {
                const regexPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                const regex = new RegExp(regexPattern);
                if(regex.test(reqEmail)) {
                    resolve("OK");
                } else {
                    resolve("NOT OK");
                }
            } else {
                resolve("NOT OK");
            }
        });
    } catch(err) {
        console.log(err);
        reject();        
    }
}
