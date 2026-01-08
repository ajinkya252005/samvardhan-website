const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const upload = require('../config/cloudinary');

router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Cover image is required" });
        }

        const { title, date, description } = req.body;

        const newEvent = new Event({
            title,
            date,
            description,
            imageUrl: req.file.path // Cloudinary URL
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 1. GET all events (Sorted by newest first)
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 3. DELETE an event
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;