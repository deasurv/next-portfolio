const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    userID: {type: String, required: true},
    title: {type: String, required: true, maxlength: 128},
    company: {type: String, required: true, maxlength: 128},
    location: {type: String, required: true, maxlength: 128},
    position: {type: String, required: true, maxlength: 128},
    description: {type: String, required: true, maxlength: 2048},
    startDate: {type: Date, required: true},
    endDate: Date
});

module.exports = mongoose.model('Portfolio', portfolioSchema);