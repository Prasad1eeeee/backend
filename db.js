const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/foodapp';

const mongodb = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        const fetch_data = await mongoose.connection.db.collection("foodData");

        // Use toArray separately to convert the cursor to an array
        const data = await fetch_data.find({}).toArray();

        const foodCategory = await mongoose.connection.db.collection("foooditems");
        const catData = await foodCategory.find({}).toArray();

        // Store the data in global variables
        global.foodData = data;
        global.foooditems = catData;

        console.log("Data fetched and stored in global variables");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = mongodb;
