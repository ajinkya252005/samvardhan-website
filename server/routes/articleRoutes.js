// server/routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const upload = require('../config/cloudinary'); // Using your existing configured upload middleware

// 1. ADD a new Article
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        const { title, publisher, date, link } = req.body;

        const newArticle = new Article({
            title,
            publisher,
            date,
            link,
            image: req.file.path // This gets the Cloudinary URL automatically!
        });

        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        console.error("Error adding article:", error);
        res.status(500).json({ error: "Failed to add article" });
    }
});

// 2. GET all Articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ date: -1 }); // Newest first
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch articles" });
    }
});

// 3. DELETE an Article
router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete article" });
    }
});

module.exports = router;