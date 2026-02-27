// server/models/Article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    publisher: { type: String }, // e.g., "Sakal", "Times of India"
    date: { type: Date, required: true },
    link: { type: String }, // Optional: Link to the e-paper or website
    image: { type: String, required: true }, // Cloudinary Image URL
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);