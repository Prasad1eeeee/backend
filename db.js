const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/foodapp';

const mongodb = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = mongodb; // Export the mongodb function
