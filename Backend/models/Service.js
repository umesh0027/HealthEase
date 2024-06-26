
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true 
    },
  description: {
     type: String,
      required: true
     },
  content: {
     type: String,
     required: true
   },
  imageUrl: {
     type: String,
     required: true 
  },
  department: { 
    type: String,
     required: true
   },
});

module.exports = mongoose.model('Service', serviceSchema);
