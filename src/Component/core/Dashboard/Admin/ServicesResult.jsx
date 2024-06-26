

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [editedService, setEditedService] = useState({});
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service._id);
    setEditedService({ ...service });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseURL}/services/${editedService._id}`, editedService);
      setEditingService(null);
      setEditedService({});
      fetchData();
      toast.success('Service updated successfully');
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Error updating service');
    }
  };

  const handleCancel = () => {
    setEditingService(null);
    setEditedService({});
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/services/${id}`);
      setServices(services.filter(service => service._id !== id));
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Error deleting service');
    }
  };

  const handleChange = (e) => {
    setEditedService({ ...editedService, [e.target.name]: e.target.value });
  };

  const handleViewMoreDescription = (description) => {
    setModalContent(description);
    setIsModalOpen(true);
  };

  const handleViewMoreContent = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  return (
   <>
   <h2 className="text-4xl font-bold mt-10 mb-10  text-white text-center">Service List</h2>
     <div className="flex flex-col overflow-x-auto  p-4 mx-20 md:p-0 md:mx-4  mx-auto ">
      {/* <h2 className="text-4xl font-bold mt-10 mb-10  text-white text-center">Service List</h2> */}
      <table className="bg-white border mb-10 mx-4 w-12/12 max-w-[1000px]  ">
        <thead className=''>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Description</th>
            <th className="border-b-2 border-gray-300 px-4  py-2">Content</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Department</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Image</th>
           
            <th className="border-b-2 border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className='mx-10'>
          {services.map(service => (
            <tr key={service._id}>
              <td className="border-b text-center border-gray-300 px-4 py-2" >{editingService === service._id ? <input type="text" name="name" value={editedService.name} onChange={handleChange} className="p-2 px-4 border border-gray-300 rounded-md  " /> : service.name}</td>
              <td className="border-b border-gray-300 px-4 py-2">{editingService === service._id ? <input type="text" name="description" value={editedService.description} onChange={handleChange} className="p-2 border border-gray-300 rounded-md w-full" /> : <td className=" border-gray-300 px-4 py-2">
                {service.description.length <= 10 ? service.description : `${service.description.substring(0, 10)}...`}
                {service.description.length > 10 && (
                  <button onClick={() => handleViewMoreContent(service.description)} className="text-blue-500">View More</button>
                )}
              </td>}</td>
              <td className="border-b border-gray-300 py-2 text-center ">{editingService === service._id ? <input type="text" name="content" value={editedService.content} onChange={handleChange} className="p-2 border border-gray-300 rounded-md w-full" /> : <td className=" border-gray-300 px-4 py-2">
                {service.content.length <= 10 ? service.content : `${service.content.substring(0, 15)}...`}
                {service.content.length > 10 && (
                  <button onClick={() => handleViewMoreContent(service.content)} className="text-blue-500">View More</button>
                )}
              </td>}</td>
              <td className="border-b border-gray-300 px-4 py-2 text-center">{editingService === service._id ? <input type="text" name="department" value={editedService.department} onChange={handleChange} className="p-2 border border-gray-300 rounded-md w-full text-center" /> : <td className=" border-gray-300 px-4 py-2">
                {service.department.length <= 10 ? service.department : `${service.department.substring(0, 10)}...`}
                {service.department.length > 10 && (
                  <button onClick={() => handleViewMoreContent(service.department)} className="text-blue-500">View More</button>
                )}
              </td>}</td>
              <td className="border-b border-gray-300 px-4 py-2"><img src={service.imageUrl} alt="Service" className="w-16 h-16 object-cover" /></td>
             
             
              <td className="border-b border-gray-300 px-4 py-2 space-y-4">
                {editingService === service._id ? (
                  <>
                    <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2">Update</button>
                    <button onClick={handleCancel} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(service)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2">Edit</button>
                    <button onClick={() => handleDelete(service._id)} className="bg-pink-500 hover:bg-pink-700 text-white px-4 py-2 rounded-md">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-y-visible  ">
        
         <div className="bg-white rounded-lg p-8 max-w-md mx-4">
         <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
          <div className="bg-white p-4 rounded-lg z-10">
            <div className="text-xl font-bold mb-4">Service Content</div>
            <div className="mb-4 text-sm w-full text-gray-800 leading-relaxed overflow-hidden max-w-full max-h-full">{modalContent}</div>
            <button onClick={handleCloseModal} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Close</button>
          </div>
         </div>
        </div>
      )}
    </div>
   </>
  );
};

export default ServiceList;


