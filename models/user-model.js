const mongoose = require('mongoose');
const File = require('./file-model');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    email: String,
    admin: Boolean,
    totalStorage: Number,
    sharedFolders: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Folder'
    }],
    sharedFiles: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'File'
    }],
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);