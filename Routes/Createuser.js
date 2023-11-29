const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongodb = require('../db'); // Require mongodb
const { body, validationResult } = require('express-validator');

router.post('/createuser', [

    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password','password is not strong').isLength({ min: 5 })]

    , async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Wait for the MongoDB connection to be ready
            await mongodb();

            // Create a new user document
            const newUser = new User({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: req.body.password
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
