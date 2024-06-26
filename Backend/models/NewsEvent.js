// models/NewsEvent.js

const mongoose = require('mongoose');

const newsEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const NewsEvent = mongoose.model('NewsEvent', newsEventSchema);

module.exports = NewsEvent;
