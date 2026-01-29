const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const upload = require('../config/cloudinary'); // Import our new upload config

// POST /api/donations
// Uses 'upload.single' to handle the file field named 'screenshot'
router.post('/', upload.single('screenshot'), async (req, res) => {
    try {
        // 1. Check if file is there
        if (!req.file) {
            return res.status(400).json({ message: "Payment screenshot is required" });
        }

        // 2. Extract text data from the form
        const { donorName, email, phone, amount } = req.body;

        // 3. Create new Donation document
        const newDonation = new Donation({
            donorName,
            email,
            phone,
            amount,
            screenshotUrl: req.file.path // Cloudinary automatically gives us the URL here
        });

        // 4. Save to DB
        const savedDonation = await newDonation.save();
        res.status(201).json(savedDonation);

    } catch (err) {
        console.error("Error saving donation:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// GET /api/donations (For Admin Dashboard)
router.get('/', async (req, res) => {
    try {
        // Fetch all donations, sorted by newest first
        const donations = await Donation.find().sort({ createdAt: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ message: "Error fetching donations", error: err.message });
    }
});

// PUT /api/donations/:id/verify (Mark as Verified)
router.put('/:id/verify', async (req, res) => {
    try {
        const updatedDonation = await Donation.findByIdAndUpdate(
            req.params.id, 
            { isVerified: true }, 
            { new: true } // Return the updated document
        );
        res.json(updatedDonation);
    } catch (err) {
        res.status(500).json({ message: "Error updating status", error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDonation = await Donation.findByIdAndDelete(id);

        if (!deletedDonation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (error) {
        console.error('Error deleting donation:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;