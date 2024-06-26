import React from 'react';

import BlogForm from './BlogForm';
import BlogList from './BlogList';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardHeader from '../../DashboardHeader';
const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
    return (
        <div>
         <DashboardHeader />
        
            <BlogForm fetchData={fetchData} />
            <BlogList blogs={blogs}  fetchData={fetchData} />
        </div>
    );
};

export default AdminBlog;



