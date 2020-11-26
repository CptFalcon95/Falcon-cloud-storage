const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const mongoose = require("mongoose");

const File = require('../models/file-model');
const { cpuUsage } = require('process');
const appDir = path.dirname(require.main.filename);

//TODO Put this somewhere else
const compressedMimetypes = [  
    'application/zip', 
    'application/x-tar', 
    'application/x-7z-compressed',
    'application/x-zip-compressed'
];
const imageMimetypes = [
    'image/png', 'image/jpeg',
];
const videoMimetypes = [
    'video/x-msvideo', 
    'video/mpeg', 
];
const audioMimetypes = [
    'audio/mpeg', 
    'audio/wav', 
];
const documentMimetypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/msword', 
    'application/vnd.ms-excel', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    'application/vnd.oasis.opendocument.text', 
    'application/vnd.oasis.opendocument.spreadsheet', 
    'application/vnd.oasis.opendocument.presentation', 
    'application/vnd.ms-powerpoint', 
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/pdf'
];

function checkFileType(file) {
    const mimetype = file.mimetype;
    if(compressedMimetypes.indexOf(mimetype) >= 0) {
        console.log('compressed');
        return {
            ok: true,
            file: 'compressed'
        };
    } else if (imageMimetypes.indexOf(mimetype) >= 0) {
        console.log('image');
        return {
            ok: true,
            file: 'image'
        };
    } else if (audioMimetypes.indexOf(mimetype) >= 0) {
        console.log('audio');
        return {
            ok: true,
            file: 'audio'
        };
    } else if (videoMimetypes.indexOf(mimetype) >= 0) {
        console.log('video');
        return {
            ok: true,
            file: 'video'
        };
    } else if (documentMimetypes.indexOf(mimetype) >= 0) {
        console.log('document');
        return {
            ok: true,
            file: 'document'
        };
    } else {
        return {
            ok: false,
            file: file.originalname
        };
    }
}

// Function that handles user folder creation and user root creation
function createFolder(id, root, folderName) {
    try {
        const userRootPath = `${appDir}/user_data/${id}`
        // Create Root path for new user
        if (!fs.existsSync(userRootPath) && root == true) {
          fs.mkdirSync(userRootPath);
          // Create thumbnails folder
          fs.mkdirSync(`${userRootPath}/.thumbnails`);
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

// TODO initialize if user_data folder is not created. Run this function in app.js check if created
//
// Delete file

async function storeFiles(req, res) {
    try {
        const id = req.session.auth._id;
        const userRoot = `${appDir}/user_data/${id}`;
        const files = req.files;
        for (let x = 0; x < files.length; x++) {
            const originalFileName = files[x].originalname;
            const src = `${appDir}/tmp/${originalFileName}`;
            const fileExtention = path.extname(src);
    
            const newFileName = crypto.randomBytes(32).toString('hex');
            const dest = `${userRoot}/${newFileName + fileExtention}`;
    
            const data = {
                _id: mongoose.Types.ObjectId(),
                name: newFileName,
                originalName: originalFileName,
                extention: fileExtention,
                type: checkFileType(files[x]).file,
                favorited: false,
                owner: id,
                folder: null,
            }
            // Move files from tmp to user folder
            
            if(await storeDataPromise(req, res, data)) {
                fs.renameSync(src, dest);
            }
            
        }
        res.status(201)
        .json({
            success: true,
        });
    } catch (err) {
        console.log(err);
    }    
}

function storeDataPromise(req, res, fileData) {
    return new Promise((resolve, reject) => {
        const file = new File(fileData);
        file
        .save()
        .then((result) => {
            resolve(result);
        })
        .catch(err => reject(err));
    });
}

// checkFileType returns false or file type is supported

module.exports = {
    createFolder,
    storeFiles,
    checkFileType
}