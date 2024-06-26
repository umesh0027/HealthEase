import React from 'react';
import Navs from './Nav';
import Footer from '../Common/Footer';

const DiseaseDetailsPage = ({ disease }) => {
  return (
   <>
   <Navs/>
     <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">{disease.title}</h1>
        <img src={disease.image} alt={disease.title} className="w-64 h-64 mb-4" />
        <p>{disease.description}</p>
        <p className='mx-auto p-10'>{disease.details}</p>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default DiseaseDetailsPage;