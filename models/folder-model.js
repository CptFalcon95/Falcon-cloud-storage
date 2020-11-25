const mongoose = require('mongoose');

const folderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    folderName: String,
    path: String,
    sharedOwners: String,
    owner: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]
}, {
    collection: 'files'
});

module.exports = mongoose.model('Folder', folderSchema);