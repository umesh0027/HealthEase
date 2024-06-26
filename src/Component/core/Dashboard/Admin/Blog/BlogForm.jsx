import React, { useState } from 'react';
import axios from 'axios';
import { HiChevronDown } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const BlogForm = ({ fetchData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState('');

  const datacategories = [
    {
      id: 1,
      name: 'Healthcare Tips'
    },
    {
      id: 2,
      name: 'Parenting & Family Health'
    },
    {
      id: 3,
      name: 'Healthcare Innovation'
    },
    {
      id: 4,
      name: 'Patient Experience & Wellness'
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('description', description);
    formData.append('imageUrl', image);
    formData.append('categories', categories); // Make sure the field name matches backend

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Blog created successfully');
      toast.success('Blog created successfully');
      fetchData(); // Fetch data again to update the list
      // Reset form fields
      setTitle('');
      setContent('');
      setDescription('');
      setCategories('');
      setImage(null);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value);
  };

  return (
    <div className="mt-8 mx-auto w-10/12 flex flex-col bg-blue-250 rounded-xl mb-10">
      <h2 className="text-2xl font-bold mb-4 ml-10 mt-10">Create Blog</h2>
      <div className='mx-auto mb-10 bg-blue-250 rounded-xl  p-8 md:mx-10 lg:mx-auto '>
        
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} id="content" placeholder="Content" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="categories" className="block text-gray-700 text-sm font-bold mb-2">Categories</label>
          <div className="relative">
            <select
              value={categories}
              onChange={handleCategoryChange}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Category</option>
              {datacategories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <HiChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} id="image" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-10 mt-4 mx-auto">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default BlogForm;

