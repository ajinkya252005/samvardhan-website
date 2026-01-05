const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// 1. GET all events (Sorted by newest first)
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST a new event (For Admin)
router.post('/', async (req, res) => {
    const { title, date, description, imageUrl } = req.body;

    const newEvent = new Event({
        title,
        date,
        description,
        imageUrl
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. DELETE an event (For Admin)
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;