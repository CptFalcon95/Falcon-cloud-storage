const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fileName: String,
    fileType: String,
    filePath: String,
    owner: String,
    sharedOwners: String,
}, {
    collection: 'uploads'
});

module.exports = mongoose.model('File', fileSchema);