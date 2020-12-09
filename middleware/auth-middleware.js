const mongoose = require('mongoose');
const File = require('../models/file-model');

module.exports = {
    checkGuest,
    checkLogin,
    checkAccess,
};

function checkLogin(req, res, next) {
    if (req.session.auth != undefined) {
        if (req.session.auth || req.path==='/') {
            next();
        } else {
           res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
}

function checkGuest(req, res, next) {
    if (!req.session.auth) {
        next();
    } else {
        res.redirect("/user");
    }
}

function checkAccess(req, res, next) {
    const user = req.session.auth;
    if(req.session.auth != undefined) {
        const fileId = req.params.id
        const user = req.session.auth;
        File.findOne({_id: fileId}, (err, result) => {
            if(result != null) {
                if(result.owner == user._id) {
                    next();
                } else if (result.sharedOwners.indexOf(user._id) >= 0) {
                    next();
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(404);
    }
}