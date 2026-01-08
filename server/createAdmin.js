const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to DB...");
        
        // Change these to what you want your login to be!
        const username = "Admin";
        const password = "Samvardhan2024"; 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        console.log("✅ Admin Created Successfully!");
        mongoose.connection.close();
    })
    .catch(err => console.error(err));