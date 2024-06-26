const mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema({
    hospitalNumber: {
        type: String,
        required: true
    },
    emergencyNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Support', SupportSchema);
