const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const upload = require('../config/cloudinary');

// 1. GET all blogs (Sorted by newest date)
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST a new blog (With Image Upload)
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Cover image is required" });
        }

        const { title, date, description, link } = req.body;

        const newBlog = new Blog({
            title,
            date,
            description,
            link,
            imageUrl: req.file.path // Cloudinary URL
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. DELETE a blog
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;