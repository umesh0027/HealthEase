import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import NavBar from '../../Component/Common/NavBar';

import Gallery from '../../Component/Common/Gallery';
import Footer from '../../Component/Common/Footer';
const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/services/${id}`);
      setService(response.data);
     
    } catch (error) {
      console.error('Error fetching service details:', error);
    }
  };
  if (!service) {
    return <div className='flex justify-center items-center text-4xl'>Loading...</div>;
  }
  return (
    <div>
      <NavBar/>
      {
        service &&
        <div key={service.id}>
        <div className='bg-blue-150 h-auto pt-16  md:flex flex-col '>
     <div className=''>
         <div className=" lg:flex flex-row lg:mx-10 mx-4 ">
      
      <div className=' md:w-[100%] lg:w-[50%] lg:mr-10 mb-10 '>
        <img src={service.imageUrl} alt="service" className="w-auto object-center rounded-xl " />
      </div>
      <div className='lg:w-[50%]  px-2 text-richblack-5 '>
      <h1 className="text-3xl font-bold mb-4 mt-6 text-center">{"About"} {service.name} {"Service"}</h1>
        <p className="text-gray-600  text-left">{service.description}</p>
        <p className="text-richblack-600  mt-6 text-left  "><span className='text-lg font-semibold text-richblack-900'>Service: </span> { service.content}</p>
        <p className="text-richblack-600 py-4  text-left  "><span className='text-lg font-semibold text-richblack-900'>Department: </span> { service.department}</p>
     
      </div>
    </div>
     </div>
      </div>
        </div>
      }
    
     <Gallery/>
      
      <Footer/>
    </div>
  );
};

export default ServiceDetailsPage;
