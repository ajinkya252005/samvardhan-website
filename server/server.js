const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const eventRoutes = require('./routes/eventRoutes');
const photoRoutes = require('./routes/photoRoutes');
const donationRoutes = require('./routes/donationRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware (Allows the frontend to talk to the backend)
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Simple Route to check if server is working
app.get('/', (req, res) => {
    res.send("Samvardhan Backend is Running!");
});

app.use('/api/events', eventRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/auth', authRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.get('/ping', (req, res) => {
    res.send('Pong! Samvardhan Server is awake.');
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});