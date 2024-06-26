const NewsEvent = require("../models/NewsEvent");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const createNewsEvent = async (req, res) => {
    try {
      const { title, description, date, location } = req.body;
      const image = req.files.image;

       // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary( image,
        process.env.FOLDER_NAME,
        1000,
        1000);
        console.log("imagesss",image)
  
      const newNewsEvent = new NewsEvent({ title,
         description,
          date,
           location,
           image:imageUrl.secure_url , });
      await newNewsEvent.save();
      
      res.json({ message: 'News event added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllNewsEvents = async (req, res) => {
    try {
      const newsEvents = await NewsEvent.find();
      res.json(newsEvents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getNewsEventById = async (req, res) => {
    try {
      const newsEvent = await NewsEvent.findById(req.params.id);
      if (!newsEvent) {
        return res.status(404).json({ message: 'News event not found' });
      }
      res.json(newsEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update an existing news event
  const updateNewsEvent = async (req, res) => {
    try {
      const { title, description, date, location } = req.body;
      let imageUrl = '';
  
      const newsEvent = await NewsEvent.findById(req.params.id);
      if (!newsEvent) {
        return res.status(404).json({ message: 'News event not found' });
      }
  
      // Check if a new image is uploaded
      if (req.files && req.files.image) {
        const image = req.files.image;
        // Upload the new image to Cloudinary
        const imageResponse = await uploadImageToCloudinary(
          image, // Assuming req.files.image contains the uploaded image
          process.env.FOLDER_NAME, // Cloudinary folder name
          1000, // Width
          1000 // Height
        );
        imageUrl = imageResponse.secure_url;
      } else {
        // If no new image uploaded, keep the existing image URL
        imageUrl = newsEvent.image;
      }
  
      newsEvent.title = title;
      newsEvent.description = description;
      newsEvent.date = date;
      newsEvent.location = location;
      newsEvent.image = imageUrl;
  
      await newsEvent.save();
      res.json({ message: 'News event updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const deleteNewsEvent = async (req, res) => {
    try {
      const newsEvent = await NewsEvent.findByIdAndDelete(req.params.id);
      if (!newsEvent) {
        return res.status(404).json({ message: 'News event not found' });
      }
    //   await newsEvent.remove();
      res.json({ message: 'News event deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = {
    createNewsEvent,
    getAllNewsEvents,
    getNewsEventById,
    updateNewsEvent,
    deleteNewsEvent
  };