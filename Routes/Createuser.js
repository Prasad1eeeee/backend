// ///
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongodb = require('../db'); // Require mongodb
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

router.post(
    '/createuser',
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'password is not strong').isLength({ min: 5 }),
        body('location').isLength({ min: 3 }), // Add validation for the location
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Wait for the MongoDB connection to be ready
            await mongodb();

            // Hash the user's password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Create a new user document with the hashed password and location
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                location: req.body.location,
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
    }
);

router.post(
    '/loginuser',
    [
        body('email').isEmail(),
        body('password', 'password is not strong').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Wait for the MongoDB connection to be ready
            await mongodb();

            // Find the user by email
            const userData = await User.findOne({ email });

            if (!userData) {
                return res.status(400).json({ errors: 'User not found' });
            }

            // Compare the provided password with the hashed password
            const isPasswordMatch = await bcrypt.compare(password, userData.password);

            if (!isPasswordMatch) {
                return res.status(400).json({ errors: 'Incorrect password' });
            }

            // Authentication successful
            return res.json({ success: true });
        } catch (error) {
            // Handle any errors
            console.error(error);
            res.status(500).json({ success: false });
        }
    }
);

module.exports = router;
