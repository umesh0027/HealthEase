import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../../Component/Common/NavBar';
import "../../assests/CSS/Home.css"
import Footer from '../../Component/Common/Footer';
import { useSelector } from 'react-redux';
const ServicePage = () => {
  const [services, setServices] = useState([]);
  const[readmore , setReadmore]=useState(false);
  const [showAll, setShowAll] = useState(false);
  const initialCardLimit = 6;

const {  loading } = useSelector((state) => state.auth);
  function readmoreHandler(){
      setReadmore(!readmore);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  const handleShowAll = () => {
    setShowAll(true);
  };
  const handleShowLess = () => {
    setShowAll(false);
  };
  const visibleServices = showAll ? services : services.slice(0, initialCardLimit);
  return (
   <>
   <NavBar/>
   <section className='hero-section1 lg:h-[700px] lg:w-full h-[250px] md:h-[450px]'>
   <h1 className='text-6xl text-white text-bold'></h1>

   </section>
   
   
  
     <div className="container h-full w-full bg-blue-250  " >
     <h2 className="text-2xl font-bold  text-center py-10 ">Our Services</h2>
 {loading ? (
        <div className="spinner"></div>
      ) :(<>  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10  ">
        {visibleServices.map(service => (
           
          <div key={service.id} className="rounded-xl ">
            <div className="bg-white shadow-md rounded-xl overflow-hidden w-full h-full p-4 hover:scale-105">
             <div className=''> <img src={service.imageUrl} alt="service" className=" h-[200px] w-full object-cover object-center rounded-xl" /></div>
            <div className=''>
            <div className="p-4 items-center text-center  rounded-xl">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <div className="text-gray-600 mb-2 overflow-hidden">{ readmore ? service.description: `${service.description.substring(0,20)}....`}   </div>
              

                <Link to={`/service/${service._id}`} className="text-blue-500 underline">View Page Details</Link>
              </div>
            </div>
            </div>
           
          </div>
          
        ))}
      </div>
      <div className='py-4'>
      {!showAll && services.length > initialCardLimit && (
        <div className="flex justify-center mt-8 mb-10">
          <button onClick={handleShowAll} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            View More
          </button>
        </div>
      )}
      {showAll && (
        <div className="flex justify-center mt-8">
          <button onClick={handleShowLess} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            View Less
          </button>
        </div>
      )}
      </div></>)
      }
     
     
      
     
     
       

    </div>
       <Footer/>
   </>
  );
};

export default ServicePage;
