const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
   
    date: {
        type: Date,
        default: Date.now,
    },
});





module.exports = mongoose.model("Report", reportSchema);
