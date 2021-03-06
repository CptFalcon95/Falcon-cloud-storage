const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const mongoose = require("mongoose");

const File = require('../models/file-model');
const appDir = path.dirname(require.main.filename);

//TODO Put this somewhere in a config file
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

// Function that validates mimetype and categorizes mimetypes for frontend design purposes
function checkFileType(mimetype) {
    if(compressedMimetypes.indexOf(mimetype) >= 0) {
        return { ok: true, file: 'compressed' };
    } else if (imageMimetypes.indexOf(mimetype) >= 0) {
        return { ok: true, file: 'image' };
    } else if (audioMimetypes.indexOf(mimetype) >= 0) {
        return { ok: true, file: 'audio' };
    } else if (videoMimetypes.indexOf(mimetype) >= 0) {
        return { ok: true, file: 'video' };
    } else if (documentMimetypes.indexOf(mimetype) >= 0) {
        return { ok: true, file: 'document' };
    } else {
        return { ok: false, file: 'unsupported' };
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
    console.log(appDir);
    
    try {
        const id = req.session.auth._id;
        const files = req.files;
        const userRoot = `${appDir}/user_data/${id}`;

        for (let x = 0; x < files.length; x++) {
            const originalFileName = files[x].originalname;
            const tmpSrc = `${appDir}/tmp/${originalFileName}`;
            const fileExtension = path.extname(tmpSrc);
    
            const newFileName = crypto.randomBytes(32).toString('hex');
            const dest = `${userRoot}/${newFileName + fileExtension}`;
            const mimetype = files[x].mimetype;

            const checkMimetype = checkFileType(mimetype);

            if(checkMimetype.ok) {
                const data = {
                    _id: mongoose.Types.ObjectId(),
                    name: newFileName,
                    originalName: originalFileName,
                    extension: fileExtension,
                    size: files[x].size,
                    type: checkMimetype.file,
                    favorited: false,
                    owner: id,
                    folder: null,
                }

                // Move files from tmp to user folder
                if(await storeDataPromise(req, res, data)) {
                    fs.renameSync(tmpSrc, dest);
                }
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

function getUserFiles(options) {
    return new Promise((resolve, reject) => {
        const exclude = {sharedOwners: 0, name: 0, extension: 0, owner: 0}
        File.find(options, exclude).sort({created: 'desc'}).exec((err, results) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function serveDownload(req, res) {
    File.findOne({_id: req.params.id}, {sharedOwners: 0}, (err, file) => {
        res.download(`${appDir}/user_data/${file.owner}/${file.name + file.extension}`, file.originalName);
    });
}

function serveFile(req, res) {
    File.findOne({_id: req.params.id}, {sharedOwners: 0}, (err, file) => {
        res.sendFile(`${appDir}/user_data/${file.owner}/${file.name + file.extension}`, file.originalName);
    });
}

module.exports = {
    createFolder,
    storeFiles,
    checkFileType,
    getUserFiles,
    serveDownload,
    serveFile
}