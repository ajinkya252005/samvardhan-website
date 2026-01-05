const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    caption: { type: String } // Optional text for the photo
}, { timestamps: true }); // Automatically adds 'createdAt' time

module.exports = mongoose.model('Photo', photoSchema);