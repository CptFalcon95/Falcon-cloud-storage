const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    originalName: String,
    type: String,
    extension: String,
    size: {
        type: Number
    },
    favorited: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
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
        default: null,
        ref: 'Folder'
    }
}, {
    collection: 'files'
});

module.exports = mongoose.model('File', fileSchema);