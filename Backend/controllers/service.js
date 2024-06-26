

// serviceController.js
const Service = require('../models/Service');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// // Create a new service
exports.createService = async (req, res) => {
  try {
    const { name, description, content, department } = req.body;
    const image = req.files.imageUrl;
    
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const uploadedImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const newService = new Service({ 
      name, 
      description, 
      content, 
      imageUrl: uploadedImage.secure_url, 
      department 
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, content, department } = req.body;
    let updatedServiceData = { name, description, content, department };

    // Check if there's a new image to upload
    if (req.files) {
      const image = req.files.imageUrl
      const imageUrl = await uploadImageToCloudinary( image,
        process.env.FOLDER_NAME,
        1000,
        1000); // Upload new image to Cloudinary

      updatedServiceData.imageUrl = imageUrl.secure_url;
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      updatedServiceData,
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


