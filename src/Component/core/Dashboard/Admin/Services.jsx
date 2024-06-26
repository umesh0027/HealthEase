
import React, { useState } from 'react';
import axios from 'axios';
import ServiceList from './ServicesResult';
import toast from 'react-hot-toast';
import DashboardHeader from '../DashboardHeader';
const AdminPanel = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('department', department);
    formData.append('imageUrl', image);

    try {
      const response = await axios.post(`${baseURL}/services`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Service added successfully:', response.data);
      toast.success("Service added successfully")
      // Reset form fields
      setName('');
      setDescription('');
      setContent('');
      setDepartment('');
      setImage(null);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
 

  return (
    <>
    <DashboardHeader/>
      <div className=" mt-8 mx-auto w-10/12 flex flex-col bg-blue-250 rounded-xl mb-10 ">
        <h3 className="text-lg font-bold mb-6 ml-10 mt-8 text-center">Add New Service</h3>
      <div className='mx-auto mb-10 bg-blue-250 rounded-xl  p-8 md:mx-10 lg:mx-auto '>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold text-gray-700">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-bold text-gray-700">Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-bold text-gray-700">Content:</label>
            <input type="text" id="price" value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-bold text-gray-700">Department:</label>
            <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-bold text-gray-700">Image:</label>
            <input type="file" id="image" onChange={handleImageChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-10 mb-10">Add Service</button>
        </form>
      </div>
      </div>

      <ServiceList />
    </>
  );
};

export default AdminPanel;
