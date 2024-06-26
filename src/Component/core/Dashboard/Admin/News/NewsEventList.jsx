

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardHeader from '../../DashboardHeader';
import { formattedDate } from '../../../../../utils/dateFormatter';
import { toast } from "react-hot-toast"
const NewsEventsList = () => {
  const [newsEvents, setNewsEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: null
  });

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchNewsEvents();
  }, []);

  

  const handleViewMore = (description) => {
    setSelectedEvent(description);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const fetchNewsEvents = async () => {
    try {
      const response = await axios.get(`${baseURL}/news-events`);
      setNewsEvents(response.data);

    } catch (error) {
      console.error('Error fetching news events:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      date: event.date || '',
      location: event.location || '',
      image: event.image || null
    });
   
  };
  const handleCancelEdit = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      image: null
    });
    toast.success('Event canceled successfully');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success('Event Created successfully');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('location', formData.location);
    data.append('image', formData.image);

    try {
      if (editingEvent) {
        await axios.put(`${baseURL}/news-events/${editingEvent._id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post(`${baseURL}/news-events`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchNewsEvents();
      handleCancelEdit();
      toast.success(editingEvent ? 'Event edited successfully' : 'Event created successfully');
    } catch (error) {
      console.error('Error submitting news event:', error);
      toast.error('Error submitting news event');
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/news-events/${id}`);
      fetchNewsEvents();
      toast.success("Deleted event Succesfully")
    } catch (error) {
      console.error('Error deleting news event:', error);
      toast.error("Error deleting news event")

    }
  };
 
  return (
    <>
    <DashboardHeader/>
    <div className=''>
      
    <div className=" mt-10 mx-auto w-10/12 max-w-[1000px] flex flex-col bg-blue-250 rounded-xl mb-20  ">
          <h2 className="text-2xl font-bold mb-4 ml-10 mt-8">{editingEvent ? 'Update Event' : 'Create Event'}</h2>
         <div className='mx-auto mb-10 bg-blue-250 rounded-xl  p-8 md:mx-10 lg:mx-auto'>
         <form onSubmit={handleSubmit} className="space-y-4  mb-10 max-w-lg mx-auto ">
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full mx-auto  mt-10 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"></textarea>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
            <input type="file" name="image" onChange={handleImageChange} className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white " />
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 text-white mb-10 mt-6 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mx-auto">{editingEvent ? 'Update Event' : 'Create Event'}</button>
              {editingEvent && <button type="button" onClick={handleCancelEdit} className="ml-2 mb-10 mt-6 px-4 py-2 rounded-md  bg-richblack-300 text-white px-4 py-2 rounded-md hover:bg-richblack-400 transition duration-300">Cancel</button>}
            </div>
          </form>
         </div>
        </div>



        <div className=" mt-10 mx-auto w-10/12 max-w-[1000px] flex flex-col bg-blue-250 rounded-xl mb-10">
        <h1 className="text-3xl font-bold mb-4 mt-4 text-center">News Events</h1>
      <div className=" ml-10 mr-10 overflow-x-auto ">
      {/* <h1 className="text-3xl font-bold mb-4 mt-4">News Events</h1> */}
      <table className="w-full mb-10  ">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Title</th>
            <th className="border border-gray-400 px-4 py-2">Description</th>
            <th className="border border-gray-400 px-4 py-2">Date</th>
            <th className="border border-gray-400 px-4 py-2">Location</th>
            <th className="border border-gray-400 px-4 py-2">Image</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsEvents.map(event => (
            <tr key={event._id}>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.title}</td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                {event.description.length > 30 ? (
                  <>
                    {event.description.substring(0, 30)}{'...  '}
                    <button
                      onClick={() => handleViewMore(event.description)}
                      className="text-blue-500 "
                    >
                      View More
                    </button>
                  </>
                ) : (
                  event.description
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center ">{formattedDate(event.date)}</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.location}</td>
              <td className="border border-gray-400 px-2 py-2 text-center">
                <img src={event.image} alt={event.title} className="w-[100px] " />
              </td>
              <td className="border border-gray-400 px-4 py-2 space-y-4">
                {/* Your edit and delete buttons */}
                <button onClick={() => handleEdit(event)} className=" w-[80px]  bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-2">Edit</button>
              <button onClick={() => handleDelete(event._id)} className=" w-[80px] bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50  ">
          <div onClick={handleCloseModal}  className="bg-white rounded-lg p-8 w-full items-center justify-center lg:mx-80 my-20 mx-4  ">
          <div className="flex justify-between items-center mb-4 overflow-y-visible">
            <h2 className="text-xl font-bold mb-4">Full Description</h2>
            <button onClick={handleCloseModal}  className="text-gray-500 hover:text-gray-800 ml-10">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              </div>
            <p className='mb-4 text-[12px] w-full text-gray-800 leading-relaxed overflow-y-visible max-w-full max-h-full'>{selectedEvent}</p>
           
          </div>
        </div>
      )}
    </div>

    </div>
    </div>
    </>
   
  );
};

export default NewsEventsList;
