// Require neccessary NPM Packages
const mongoose = require('mongoose');

// Define Card Schema
const cardSchema = new mongoose.Schema({
    name: {type: String, required: true},
    score: {type: String, required: true},
    effect: {type: String, required: true},
    quantity: {type: String, required: true},
    picture: {type: String}
    }, {
        timestamps: true
    });

// Compile our Model based on the Schema
const Card = mongoose.model('Card', cardSchema);

// Export our Model for use
module.exports = Card;