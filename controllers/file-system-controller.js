const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const File = require('../models/file-model');
const appDir = path.dirname(require.main.filename);

// Function that handles user folder creation and user root creation
function createFolder(id, root, folderName) {
    try {
        const userRootPath = `${appDir}/user_data/${id}`
        // Create Root path for new user
        if (!fs.existsSync(userRootPath) && root == true) {
          fs.mkdirSync(userRootPath);
          return true;
        } 
        // Create new folder wihtin the user root
        if (fs.existsSync(userRootPath) && root == false && folderName != null) {
            const newFolderPath = `${appDir}/user_data/${id}/${folderName}`
            if (!fs.existsSync(newFolderPath)) {
                fs.mkdirSync(newFolderPath);
                return true;
            }
            return false;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}

// Upload file
function upload(req, res) {
    // const id = req.session.auth._id;
    // const userRoot = `${appDir}/user_data/${id}`;
    // let filePath = userRoot;

    // if(req.body.path) {
    //     filePath += `/${req.body.path}`
    // }'
    console.log(req.files);
    res.send();
}
// Delete file

// checkFileType returns false or file type is supported

module.exports = {
    createFolder,
    upload,
}