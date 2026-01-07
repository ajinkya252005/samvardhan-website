const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');

// 1. GET all photos (Sorted by newest first)
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find().sort({ createdAt: -1 });
        res.json(photos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST a new photo (For Admin)
router.post('/', async (req, res) => {
    const { imageUrl, caption } = req.body;

    const newPhoto = new Photo({
        imageUrl,
        caption
    });

    try {
        const savedPhoto = await newPhoto.save();
        res.status(201).json(savedPhoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. DELETE a photo (For Admin)
router.delete('/:id', async (req, res) => {
    try {
        await Photo.findByIdAndDelete(req.params.id);
        res.json({ message: "Photo deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;