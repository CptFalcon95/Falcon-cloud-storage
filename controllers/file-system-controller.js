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

        const newFileName = crypto.randomBytes(32).toString('hex');
        const dest = `${userRoot}/${newFileName + fileExtention}`;

        const data = {
            name: newFileName,
            originalName: originalFileName,
            path: dest,
            type: fileExtention,
        }

        // Move files from tmp to user folder
        if (fs.renameSync(src, dest)) {
            // fileUpload(req, res, data)
        }
    }
    res.send();
}
// Delete file

async function fileUpload(req, res, data) {
    try {
        const user = {
            _id: mongoose.Types.ObjectId(),
            // FIXME escaped characters are not rendered in unicode
            fileName: data,
            fileType: bcrypt.hashSync(req.body.password, 10),
            filePath: escape(req.body.email),
            admin: 0,
            totalStorage: 1
        }
        await fileUploadPromise(req, res, file);
        res.status(201)
        .json({
            success: true,
        });
    } catch (err) {
        console.log(err);
    }    
}

function fileUploadPromise(req, res, fileData) {
    return new Promise((resolve, reject) => {
        const file = new File(fileData);
        console.log(file);
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
    upload,
}