const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Cloudinary URL
    link: { type: String, required: true }      // External URL
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);