const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const upload = require('../config/cloudinary'); // Import Cloudinary config

// 1. GET all photos (Sorted by newest first)
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find().sort({ createdAt: -1 });
        res.json(photos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST a new photo (With Image Upload)
// We use upload.single('image') to handle the file from the frontend
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const { caption } = req.body;

        const newPhoto = new Photo({
            imageUrl: req.file.path, // Cloudinary URL from the uploaded file
            caption
        });

        const savedPhoto = await newPhoto.save();
        res.status(201).json(savedPhoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. DELETE a photo
router.delete('/:id', async (req, res) => {
    try {
        await Photo.findByIdAndDelete(req.params.id);
        res.json({ message: "Photo deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;