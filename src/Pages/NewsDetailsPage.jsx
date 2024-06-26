import React, { useState, useEffect } from 'react';
import { Component } from "react";
import Slider from "react-slick";
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import NavBar from '../Component/Common/NavBar';
import { formattedDate } from '../utils/dateFormatter';
import ContactUsForm from '../Component/ContactUsPage/ContactUsForm';
import "../assests/CSS/Contact.css"
import ContactForm from '../Component/ContactUsPage/ContactForm';
import NewsListPage from '../Component/HomeComponent/NewsList';
import Footer from '../Component/Common/Footer';
const NewsDetailsPage = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
//   const [newsEvents, setNewsEvents] = useState([]);
//   const[readmore , setReadmore]=useState(false);
  useEffect(() => {
    fetchEventDetails();
    // fetchNewsEvents();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/news-events/${id}`);
      setEventDetails(response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };


  if (!eventDetails) {
    return <div className='flex justify-center items-center text-4xl'>Loading...</div>;
  }

  return (
    <>
    <NavBar/>
      <div className='bg-blue-150 h-auto md:flex flex-col lg:pt-20 md:pt-20 pt-10 pb-10'>
     <div className=''>
         <div className="lg:flex flex-row lg:mx-10 md:mx-8 mx-4 ">
      
      <div className=' md:w-[100%] lg:w-[50%] lg:mr-10  '>
        <img src={eventDetails.image} alt={eventDetails.title} className="w-auto object-center " />
      
      </div>
      <div className='lg:w-[50%] text-center '>
      <h1 className="text-3xl font-bold mb-4 mt-6"> {eventDetails.title} </h1>
        <p className="text-gray-600 mb-2 text-center px-4 text-justify">{eventDetails.description}</p>
        <p className="text-gray-600 mb-2 mt-20 text-xl text-white">Event Date: { formattedDate (eventDetails.date)}</p>
        <p className="text-gray-600 mb-2 text-xl text-white">Event Location: {eventDetails.location}</p>
      </div>
    </div>
     </div>
      </div>
       
   
      
      <div className="contact-form2 md:w-[60%] md:mx-auto lg:w-[50%] lg:mx-auto mx-4 bg-blue-250 mb-10  justify-center items-center">
      <h1 className='text-bold text-3xl text-richblack-900 mb-2 '>Enquiry Form</h1>
         <p className='text-sm text-richblack-800 text-center  mb-8'>If you have any Query related to this Events then fill this form  our team will get in touch with you as soon as possible.  </p>    
        <ContactUsForm />
      </div>
     

      <Footer/>
    </>
  );
};

export default NewsDetailsPage;
