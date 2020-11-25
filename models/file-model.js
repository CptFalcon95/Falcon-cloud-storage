const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fileName: String,
    fileType: String,
    filePath: String,
    owner: String,
    sharedOwners: String,
    folders: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Folder'}
    ],
}, {
    collection: 'files'
});

module.exports = mongoose.model('File', fileSchema);