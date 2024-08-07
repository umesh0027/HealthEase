const mongoose = require('mongoose');
 
const postSchema = new mongoose.Schema({
    title: {
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
    imageUrl: String,
   
    categories: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
   
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
