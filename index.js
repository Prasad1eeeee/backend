const express = require('express');
const app = express();
const port = 5000;
const mongodb = require('./db'); // Adjust the path as needed

// Call the mongodb function to connect to MongoDB
mongodb();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
app.use('/api', require('./Routes/Createuser'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
