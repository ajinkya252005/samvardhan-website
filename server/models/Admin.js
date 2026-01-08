const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } // This will store the HASHED password, not plain text
});

module.exports = mongoose.model('Admin', adminSchema);