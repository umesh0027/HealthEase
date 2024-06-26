

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Component/Common/NavBar';
import Footer from '../Component/Common/Footer';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [readmore , setReadmore] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/blogs`);
      setBlogs(response.data);
      setFilteredBlogs(response.data.slice(0, 12)); // Initially show only 12 blogs
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleCategoryFilter = async (category) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/blogs/category/${category}`);
    const filtered = response.data;
    setFilteredBlogs(filtered.slice(0, 12)); // Limit to 12 blogs after filtering
    setSelectedCategory(category);
  };

  const handleClearFilter = () => {
    setFilteredBlogs(blogs.slice(0, 12)); // Reset to initial 12 blogs
    setSelectedCategory('');
  };

  const handleViewMore = (id) => {
    navigate(`/blogs/${id}`); // Navigate to the blog details page
  };

  return (
    <>
      <NavBar />
      <div className='flex flex-col md:flex-row'> 
        <div className="w-full md:w-1/4 bg-richblack-700">
          {/* Category buttons */}
          <div className="container mx-auto py-8">
            <div className="justify-center mb-4 flex flex-col">
              {/* Use Set to store unique categories */}
              {Array.from(new Set(blogs.map(blog => blog.categories[0]))).map(category => (
                <button 
                  key={category}
                  onClick={() => handleCategoryFilter(category)} // Filter by category
                  className={`px-4 py-2 rounded mx-4 mb-4 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-pink-200 text-pink-700 hover:bg-blue-500 hover:text-white'}`}
                >
                  {category}
                </button>
              ))}
              <button onClick={handleClearFilter} className={`px-4 py-2 rounded mx-4 mb-4 ${selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-white hover:bg-blue-50 hover:text-white'}`}>Clear Filter</button>
            </div>
          </div>
        </div>
    
        <div className='w-full md:w-3/4 bg-blue-150'>
          {/* Render filtered blogs */}
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 mx-10">
              {filteredBlogs.map(blog => (
                <div key={blog._id} className="bg-white rounded-xl shadow-md p-4 hover:scale-105">
                  <img src={blog.imageUrl} alt="Blog" className="h-[200px] w-full object-cover object-center rounded-t-lg hover:scale-105" />
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-4">{ readmore ? blog.description : `${blog.description.substring(0, 50)}....` }</p>
                  <button onClick={() => handleViewMore(blog._id)} className="text-blue-500 font-semibold cursor-pointer">View More</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogList;
