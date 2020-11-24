const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    email: String,
    admin: Boolean,
    totalStorage: Number
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);