const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	Address: {
		type: String,
		
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
	Age: {
		type: Number,
		trim: true,
	},
	AlternatecontactNumber: {
		type: Number,
		trim: true,
	},
	BloodGroup: {
		type: String,
		
	  },
	  location: {
		type: String,
	  },

	
});

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);
