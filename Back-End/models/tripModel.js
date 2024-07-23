const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;