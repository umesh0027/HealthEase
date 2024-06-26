

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { RiSaveLine, RiCloseLine } from "react-icons/ri";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedBlog, setEditedBlog] = useState({ _id: '', title: '', description: '', content: '', imageUrl: '', categories: []});
  const [modalContent, setModalContent] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchData();
    fetchAllCategories();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/categories`);
      setAllCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEdit = (blog) => {
    setEditMode(blog._id);
    setEditedBlog({ ...blog, categories: [...blog.categories] });
    toast.success('Editing mode activated');
  };

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setEditedBlog({ ...editedBlog, [e.target.name]: e.target.value});
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${baseURL}/blogs/${editedBlog._id}`, editedBlog);
      setEditMode(null);
      setEditedBlog({ _id: '', title: '', description: '', content: '', imageUrl: '', categories: []});
      fetchData();
      toast.success('Blog saved successfully');
    } catch (error) {
      console.error('Error editing blog:', error);
      toast.error('Error editing blog');
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${baseURL}/blogs/${blogId}`);
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      toast.error('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleViewMore = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col  overflow-x-auto mx-auto  p-4 mx-20 md:p-0 md:mx-4 ">
      <h2 className="text-4xl font-bold mt-10 mb-10 text-white text-center">Blog List</h2>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
          <div onClick={() => setModalOpen(false)} className="bg-white rounded-lg p-8 w-full items-center justify-center mx-10 lg:mx-80 my-auto mt-10 mb-10 ">
            <div  className="flex justify-between items-center mb-4 overflow-y-visible ">
              <h3 className="text-lg font-semibold">Full Content</h3>
              <button  className="text-gray-500 hover:text-gray-800 ml-10">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <p className='mb-4 text-[12px] w-full text-gray-800 leading-relaxed overflow-hidden max-w-full max-h-full'>{modalContent}</p>
          </div>
        </div>
      )}
     <div className='overflow-x-auto '>
     <table className="bg-white border mb-10 mx-4 ">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-400 px-4 py-2">Title</th>
            <th className="border-b-2 border-gray-400 px-4 py-2">Description</th>
            <th className="border-b-2 border-gray-400 px-4 py-2">Content</th>
            <th className="border-b-2 border-gray-400 px-4 py-2">Categories</th>
            <th className="border-b-2 border-gray-400 px-4 py-2">Image</th>
            <th className="border-b-2 border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className='mx-10'>
          {blogs.map(blog => (
            <tr key={blog._id}>
            <td className="border-b text-center border-gray-300 px-4 py-2" >{editMode === blog._id ? <input type="text" name="title" value={editedBlog.title} onChange={handleChange} className="p-2 px-4 border border-gray-300 rounded-md  " /> : blog.title}</td>

              <td className="border-b border-gray-300 px-4 py-2">{editMode === blog._id ? <input type="text" name="description" value={editedBlog.description} onChange={handleChange} className="p-2 border border-gray-300 rounded-md w-full" /> : <td className=" border-gray-300 px-4 py-2">
                {blog.description.length <= 10 ? blog.description : `${blog.description.substring(0, 10)}...`}
                {blog.description.length > 10 && (
                  <button onClick={() => handleViewMore(blog.description)} className="text-blue-500">View More</button>
                )}
              </td>}</td>

              <td className="border-b border-gray-300 px-4 py-2">{editMode === blog._id ? <input type="text" name="content" value={editedBlog.content} onChange={handleChange} className="p-2 border border-gray-300 rounded-md w-full" /> : <td className=" border-gray-300 px-4 py-2">
                {blog.content.length <= 10 ? blog.content : `${blog.content.substring(0, 10)}...`}
                {blog.content.length > 10 && (
                  <button onClick={() => handleViewMore(blog.content)} className="text-blue-500">View More</button>
                )}
              </td>}</td>
            
             
              <td className="border-b border-gray-400 px-4 py-2">{blog.categories.join(', ')}</td>
              <td className="border-b border-gray-400 px-4 py-2"><img src={blog.imageUrl} alt="Blog" className="w-[100px] h-auto rounded" /></td>
              <td className="border-b border-gray-400 px-4 py-2">
                {editMode === blog._id ? (
                  <div className='space-y-2'>
                    <button onClick={handleSaveEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center ">
                      <RiSaveLine className="mr-2" /> Save
                    </button>
                    <button onClick={() => setEditMode(null)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                      <RiCloseLine className="mr-2" /> Cancel
                    </button>
                  </div>
                ) : (
                  <div className='space-y-4 items-center'>
                  <>
                    <button onClick={() => handleEdit(blog)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mx-2  flex items-center">
                      <AiFillEdit className="mr-2" /> Edit
                    </button>
                    <button onClick={() => handleDelete(blog._id)} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded flex items-center mx-2">
                      <AiFillDelete className="mr-2" /> Delete
                    </button>
                  </>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    </div>
  );
};

export default BlogList;
