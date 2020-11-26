const mongoose = require('mongoose');

const folderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    folderName: String,
    parent: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    sharedOwners: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
}, {
    collection: 'folders'
});

module.exports = mongoose.model('Folder', folderSchema);