const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    originalName: String,
    type: String,
    extention: String,
    favorited: Boolean,
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    sharedOwners: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    folder: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Folder'
    }
}, {
    collection: 'files'
});

module.exports = mongoose.model('File', fileSchema);