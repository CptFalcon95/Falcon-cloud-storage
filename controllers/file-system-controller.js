const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

const File = require('../models/file-model');
const appDir = path.dirname(require.main.filename);

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

// Upload file
function upload(req, res) {
    const id = req.session.auth._id;
    const userRoot = `${appDir}/user_data/${id}`;
    const files = req.files;
    for (let x = 0; x < files.length; x++) {
        const originalFileName = files[x].originalname;
        const src = `${appDir}/tmp/${originalFileName}`;
        const fileExtention = path.extname(src);
        
        const dest = `${userRoot}/${newFileName + fileExtention}`;
        const newFileName = crypto.randomBytes(32).toString('hex');

        fs.renameSync(src, dest, err => {
            console.log("err");
        })
    }
    res.send();
}
// Delete file

// checkFileType returns false or file type is supported

module.exports = {
    createFolder,
    upload,
}