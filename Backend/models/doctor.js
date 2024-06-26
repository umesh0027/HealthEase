

const mongoose = require("mongoose");

// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  specialization: String,
  qualifications: String,
  experienceYears: Number,
  Fee:Number,
  
});

// Export the Doctor model
module.exports = mongoose.model("Doctor", doctorSchema);
