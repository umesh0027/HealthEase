// blogController.js
const Blog = require("../models/Blog");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Get blogs by category
exports.getBlogsByCategory = async (req, res) => {
  try {
    const blogs = await Blog.find({ categories: req.params.category });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content ,description,categories} = req.body;
    // const file = req.file;
    const image = req.files.imageUrl
     // Validate categories
    
    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary( image,
      process.env.FOLDER_NAME,
      1000,
      1000);
      console.log("imagesss",image)
    // Create a new blog post
    const newBlog = new Blog({
      title,
      content,
      description,
      imageUrl:imageUrl.secure_url ,
      categories
    });

    // Save blog post to the database
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, description, categories } = req.body;

    // Check if the image is being updated
    let imageUrl;
    if (req.file) {
      const image = req.file;

      // Upload image to Cloudinary
      const imageResponse = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME,
        1000,
        1000
      );
      imageUrl = imageResponse.secure_url;
    }

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (content) updatedFields.content = content;
    if (description) updatedFields.description = description;
    if (imageUrl) updatedFields.imageUrl = imageUrl;
    if (categories) updatedFields.categories = categories;

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to save a blog post for a user
exports.saveBlog = async (req, res) => {
  const {  blogId } = req.body;
  const userId = req.user.id
  try {
    // Create and save the saved blog post
    const savedBlog = await SavedBlog.create({ userId, blogId });
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error saving blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
