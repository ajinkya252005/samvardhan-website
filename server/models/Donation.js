const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    screenshotUrl: { type: String, required: true }, // Link to payment proof
    isVerified: { type: Boolean, default: false } // Admin can mark as true later
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);