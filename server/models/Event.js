const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true } // Link to the photo
});

module.exports = mongoose.model('Event', eventSchema);