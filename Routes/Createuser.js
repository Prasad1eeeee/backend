const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongodb = require('../db'); // Require mongodb

router.post('/createuser', async (req, res) => {
    try {
        // Wait for the MongoDB connection to be ready
        await mongodb();

        // Create a new user document
        const newUser = new User({
            name: 'prasad',
            location: 'colombo',
            email: 'prasad@gmail.com',
            password: '123456@',
        });

        // Save the new user document to the database
        await newUser.save();

        // Send a success response
        res.json({ success: true });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
