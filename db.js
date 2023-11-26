
const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/foodapp';

const mongodb = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('Connected to MongoDB');

        const fetched_data=await mongoose.connection.db.collection()

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

// Export the function without calling it
module.exports = mongodb;
