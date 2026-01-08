const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER (Run this ONCE via Postman to create your admin account)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save to DB
        const newAdmin = new Admin({
            username,
            password: hashedPassword
        });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. LOGIN (Used by the Frontend)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find Admin
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        // Check Password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate Token
        // Ideally, 'secret_key' should be in your .env file (process.env.JWT_SECRET)
        // For now, we use a hardcoded fallback for simplicity, but change this before production!
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "samvardhan_secret_key", { expiresIn: '1h' });

        res.json({ token, message: "Login Successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;