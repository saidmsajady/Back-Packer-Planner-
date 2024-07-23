const express = require('express');
const morgan = require('morgan');
const connectToDb = require('./config/dbConnect');
const tripRoutes = require('./routes/tripRoutes');

// Express App
const app = express();

// Connect to MongoDB
connectToDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/trips', tripRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
