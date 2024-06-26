const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
   // Reference to User and Profile models
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
},

    diseases: {
        type: String,
        required: true,
        trim: true
    },
    medicalHistory: String,
  
    
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
